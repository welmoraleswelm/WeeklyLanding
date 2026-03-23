import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, distinctUntilChanged, forkJoin, map, of } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiClientService } from '../../../core/http/api-client.service';
import { ApiRequestContextService } from '../../../core/http/api-request-context.service';
import { SubscriptionUiSyncService } from '../../../core/services/subscription-ui-sync.service';
import {
  TicketUploadStatusService,
  UploadNotificationSnapshot,
} from '../../ticket-management/services/ticket-upload-status.service';
import {
  AlertItem,
  CardItem,
  InvoiceItem,
  InvoiceStatus,
  PlanInfo,
  PlanOption,
  SecurityInfo,
  TaxInfo,
  UsageItem,
} from '../data/wallet.models';
import {
  WALLET_ALERTS,  WALLET_PLAN,
  WALLET_PLANS,
  WALLET_SECURITY,
  WALLET_TAX,
  WALLET_USAGE,
} from '../data/wallet.data';

@Injectable({ providedIn: 'root' })
export class WalletApiService {
  private readonly api = inject(ApiClientService);
  private readonly authService = inject(AuthService);
  private readonly requestContext = inject(ApiRequestContextService);
  private readonly subscriptionUiSync = inject(SubscriptionUiSyncService);
  private readonly notificationService = inject(TicketUploadStatusService);

  private readonly planSubject = new BehaviorSubject<PlanInfo>(WALLET_PLAN);
  private readonly usageSubject = new BehaviorSubject<UsageItem[]>(WALLET_USAGE);
  private readonly cardsSubject = new BehaviorSubject<CardItem[]>([]);
  private readonly invoicesSubject = new BehaviorSubject<InvoiceItem[]>([]);
  private readonly alertsSubject = new BehaviorSubject<AlertItem[]>(WALLET_ALERTS);
  private readonly taxSubject = new BehaviorSubject<TaxInfo>(WALLET_TAX);
  private readonly securitySubject = new BehaviorSubject<SecurityInfo>(WALLET_SECURITY);
  private readonly plansSubject = new BehaviorSubject<PlanOption[]>(WALLET_PLANS);
  private readonly messageSubject = new BehaviorSubject<string | null>(null);
  private notificationSeq = Date.now();

  readonly plan$ = this.planSubject.asObservable();
  readonly usage$ = this.usageSubject.asObservable();
  readonly cards$ = this.cardsSubject.asObservable();
  readonly invoices$ = this.invoicesSubject.asObservable();
  readonly alerts$ = this.alertsSubject.asObservable();
  readonly tax$ = this.taxSubject.asObservable();
  readonly security$ = this.securitySubject.asObservable();
  readonly plans$ = this.plansSubject.asObservable();
  readonly message$ = this.messageSubject.asObservable();

  constructor() {
    this.authService.session$
      .pipe(
        map(() => this.requestContext.getUserIdOrNull()),
        distinctUntilChanged()
      )
      .subscribe((userId) => {
        if (userId === null) {
          this.resetSensitiveData();
          return;
        }

        this.clearMessage();
        this.loadFromApi(userId);
      });
  }

  getSecuritySnapshot(): SecurityInfo {
    return this.securitySubject.value;
  }

  refreshWallet(): void {
    const userId = this.requestContext.getUserIdOrNull();
    if (userId === null) {
      this.resetSensitiveData();
      return;
    }

    this.clearMessage();
    this.loadFromApi(userId);
  }

  dismissAlert(id: string): void {
    this.alertsSubject.next(this.alertsSubject.value.filter((alert) => alert.id !== id));
  }

  getStripePublicConfig(): Observable<StripePublicConfigDto> {
    return this.api.get<StripePublicConfigDto>(API_ENDPOINTS.wallet.stripePublicConfig);
  }

  createSetupIntent(): Observable<StripeSetupIntentDto> {
    if (this.requestContext.getUserIdOrNull() === null) {
      return of({});
    }

    return this.api.post<StripeSetupIntentDto>(
      API_ENDPOINTS.wallet.createSetupIntent,
      this.requestContext.withUserId()
    );
  }

  refreshCards(successMessage?: string): void {
    this.loadCardsFromApi()
      .pipe(catchError(() => of([])))
      .subscribe((cards) => {
        this.cardsSubject.next(cards);
        if (successMessage) {
          this.messageSubject.next(successMessage);
        }
      });
  }

  setDefaultCard(cardId: string): void {
    this.promoteCardToDefault(cardId, 'Tarjeta principal actualizada.');
  }

  promoteCardToDefault(cardId: string, successMessage: string): void {
    this.setDefaultCardRequest(cardId)
      .pipe(catchError(() => of(void 0)))
      .subscribe(() => {
        this.refreshCards(successMessage);
      });
  }

  removeCard(cardId: string): void {
    this.api
      .post<void>(
        API_ENDPOINTS.wallet.removeCard,
        this.requestContext.withUserId({ idMetodoPago: cardId })
      )
      .pipe(catchError(() => of(void 0)))
      .subscribe(() => {
        this.refreshCards('Tarjeta eliminada.');
      });
  }

  retryPayment(): void {
    this.api
      .post<void>(API_ENDPOINTS.wallet.retryPayment)
      .pipe(catchError(() => of(void 0)))
      .subscribe(() => {
        const plan = this.planSubject.value;
        this.planSubject.next({
          ...plan,
          status: 'active',
          nextChargeLabel: `Proximo cobro: ${plan.renewalDate}`,
        });
        this.messageSubject.next('Pago reintentado con exito.');
        this.dismissAlert('alert-payment');
      });
  }

  updateTaxInfo(tax: TaxInfo): void {
    this.api
      .put<void>(API_ENDPOINTS.wallet.updateTaxInfo, tax)
      .pipe(catchError(() => of(void 0)))
      .subscribe(() => {
        this.taxSubject.next(tax);
        this.messageSubject.next('Datos fiscales actualizados.');
      });
  }

  changePlan(planId: string): void {
    const idPlan = this.toPositiveInteger(planId);
    if (idPlan === null) {
      this.pushGlobalNotification('No se pudo identificar el plan seleccionado.', 'error', 12000);
      return;
    }

    if (this.isFreePlanId(idPlan)) {
      this.cancelPlan();
      return;
    }

    const hasDefaultCard = this.cardsSubject.value.some((card) => card.isDefault);
    if (!hasDefaultCard) {
      this.pushGlobalNotification(
        'Debes registrar y seleccionar una tarjeta principal antes de cambiar de plan.',
        'error',
        12000
      );
      return;
    }

    this.api
      .post<CobrarCambioPlanStripeDto>(
        API_ENDPOINTS.wallet.changePlan,
        this.requestContext.withUserId({ idPlan })
      )
      .pipe(
        map((response) => ({
          ok: this.toBoolean(response?.exitoDTO),
          message:
            this.cleanText(response?.mensajeDTO) ||
            'Plan actualizado y cobrado correctamente.',
        })),
        catchError((error: HttpErrorResponse) =>
          of({
            ok: false,
            message:
              this.cleanText(error.error?.Message) ||
              this.cleanText(error.error?.message) ||
              'No se pudo cobrar el cambio de plan. Intenta nuevamente.',
          })
        )
      )
      .subscribe((result) => {
        this.pushGlobalNotification(result.message, result.ok ? 'success' : 'error', 12000);
        if (!result.ok) return;

        const userId = this.requestContext.getUserIdOrNull();
        if (userId === null) {
          this.resetSensitiveData();
          return;
        }

        this.loadFromApi(userId, () => {
          this.subscriptionUiSync.notifyPlanChanged();
        });
      });
  }

  cancelPlan(): void {
    const cancelPayload = this.requestContext.withUserId({
      estatus: 0,
      estatusPago: 0,
    });

    this.api
      .post<ChangePlanUsuarioDto[] | ChangePlanUsuarioDto>(API_ENDPOINTS.wallet.cancelPlan, cancelPayload)
      .pipe(
        map((response) => this.parseMutationResult(response, 'Suscripción cancelada correctamente. Plan gratis activado.')),
        catchError(() =>
          of({
            ok: false,
            message: 'No se pudo cancelar la suscripción. Intenta nuevamente.',
          })
        )
      )
      .subscribe((cancelResult) => {
        this.pushGlobalNotification(
          cancelResult.message,
          cancelResult.ok ? 'success' : 'error',
          12000
        );
        if (!cancelResult.ok) {
          return;
        }

        const userId = this.requestContext.getUserIdOrNull();
        if (userId === null) {
          this.resetSensitiveData();
          return;
        }

        this.loadFromApi(userId, () => {
          this.subscriptionUiSync.notifyPlanChanged();
        });
      });
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }

  refreshSecurity(): void {
    if (this.requestContext.getUserIdOrNull() === null) {
      this.securitySubject.next({
        ...WALLET_SECURITY,
        recentSessions: [],
      });
      return;
    }

    this.loadSecurityFromApi()
      .pipe(catchError(() => of(this.securitySubject.value)))
      .subscribe((security) => {
        this.securitySubject.next(security);
      });
  }

  updateAutoRenew(enabled: boolean): void {
    this.api
      .post<ActualizarRenovacionAutomaticaDto[] | ActualizarRenovacionAutomaticaDto>(
        API_ENDPOINTS.wallet.toggleAutoRenew,
        this.requestContext.withUserId({ renovacionAutomatica: enabled })
      )
      .pipe(
        map((response) => {
          const first = Array.isArray(response) ? response[0] : response;
          const ok = first ? this.toBoolean(first.renovacionAutomaticaActivaDTO) === enabled : true;
          const message =
            this.cleanText(first?.mensajeDTO) ||
            (enabled
              ? 'Cobro automatico activado correctamente.'
              : 'Cobro automatico desactivado correctamente.');

          return { ok, message };
        }),
        catchError((error: HttpErrorResponse) =>
          of({
            ok: false,
            message:
              this.cleanText(error.error?.Message) ||
              this.cleanText(error.error?.message) ||
              'No se pudo actualizar el cobro automatico.',
          })
        )
      )
      .subscribe((result) => {
        this.pushGlobalNotification(result.message, result.ok ? 'success' : 'error', 12000);
        if (!result.ok) return;

        const userId = this.requestContext.getUserIdOrNull();
        if (userId === null) {
          this.resetSensitiveData();
          return;
        }

        this.loadFromApi(userId);
      });
  }

  private loadFromApi(userId: number, onFinished?: () => void): void {
    const userPayload = { idUsuario: userId };

    forkJoin({
      plan: this.api
        .post<PlanActualUsuarioDto[] | PlanActualUsuarioDto>(API_ENDPOINTS.wallet.planSummary, userPayload)
        .pipe(
          map((items) => this.mapCurrentPlanFromApi(items)),
          catchError(() => of(WALLET_PLAN))
        ),
      subscriptionState: this.api
        .post<SubscriptionStatusDto[] | SubscriptionStatusDto>(API_ENDPOINTS.wallet.subscriptionStatus, userPayload)
        .pipe(
          map((items) => this.mapSubscriptionStateFromApi(items)),
          catchError(() => of(null))
        ),
      usage: of(WALLET_USAGE),
      cards: this.loadCardsFromApi().pipe(catchError(() => of([]))),
      invoices: this.api
        .post<StripeHistorialPagoDto[]>(API_ENDPOINTS.wallet.invoices, userPayload)
        .pipe(
          map((items) => this.mapInvoicesFromApi(items)),
          catchError(() => of([]))
        ),
      alerts: of(WALLET_ALERTS),
      tax: of(WALLET_TAX),
      security: this.loadSecurityFromApi().pipe(
        catchError(() =>
          of({
            ...WALLET_SECURITY,
            mfaEnabled: false,
            recentSessions: [],
          })
        )
      ),
      plans: this.api
        .post<PlanBeneficioVinculacionDto[]>(API_ENDPOINTS.wallet.plans, userPayload)
        .pipe(
          map((items) => this.mapPlansFromApi(items)),
          catchError(() => of(WALLET_PLANS))
        ),
    })
      .pipe(
        map((result) => ({
          ...result,
          plan: this.applySubscriptionState(result.plan, result.subscriptionState),
          plans: this.ensureCurrentPlan(result.plans, result.plan.id),
        }))
      )
      .subscribe({
        next: (result) => {
          this.planSubject.next(result.plan);
          this.usageSubject.next(result.usage);
          this.cardsSubject.next(result.cards);
          this.invoicesSubject.next(result.invoices);
          this.alertsSubject.next(result.alerts);
          this.taxSubject.next(result.tax);
          this.securitySubject.next(result.security);
          this.plansSubject.next(result.plans);
        },
        complete: () => {
          onFinished?.();
        },
      });
  }

  private resetSensitiveData(): void {
    this.planSubject.next({
      ...WALLET_PLAN,
      id: 'plan-free',
      name: 'Sin cuenta identificada',
      priceLabel: '$0',
      renewalDate: 'Pendiente',
      status: 'free',
      nextChargeLabel: 'Inicia sesion nuevamente para cargar tu informacion.',
      description: 'No se pudo identificar al usuario autenticado.',
      autoRenewEnabled: false,
    });
    this.usageSubject.next([]);
    this.cardsSubject.next([]);
    this.invoicesSubject.next([]);
    this.alertsSubject.next([]);
    this.taxSubject.next(WALLET_TAX);
    this.securitySubject.next({
      ...WALLET_SECURITY,
      recentSessions: [],
    });
    this.plansSubject.next([]);
    this.messageSubject.next('No se pudo identificar la cuenta autenticada. Vuelve a iniciar sesion.');
  }

  private ensureCurrentPlan(plans: PlanOption[], currentPlanId: string): PlanOption[] {
    if (!plans.length) return WALLET_PLANS;

    let hasCurrent = false;
    const normalized = plans.map((plan) => {
      const isCurrent = plan.id === currentPlanId || plan.isCurrent;
      if (isCurrent) hasCurrent = true;
      return { ...plan, isCurrent };
    });

    if (hasCurrent) return normalized;

    return normalized.map((plan, index) => ({ ...plan, isCurrent: index === 0 }));
  }

  private mapPlansFromApi(items: PlanBeneficioVinculacionDto[] | null | undefined): PlanOption[] {
    if (!Array.isArray(items) || !items.length) {
      return WALLET_PLANS;
    }

    const mapped = items.map((item, index) => {
      const rawName = this.cleanText(item.nombrePlanDTO);
      const name = rawName || `Plan ${index + 1}`;
      const cost = this.toNumber(item.costoPlanDTO);
      const isCurrent = this.toBoolean(item.planVinculadoUsuarioDTO);
      const perks = this.toPerks(item.beneficiosDTO);

      return {
        id: String(item.idPlanDTO ?? index + 1),
        name,
        priceLabel: this.formatPlanPrice(cost, name),
        perks: perks.length ? perks : ['Sin beneficios configurados'],
        isCurrent,
      } satisfies PlanOption;
    });

    return mapped.length ? mapped : WALLET_PLANS;
  }

  private mapCurrentPlanFromApi(items: PlanActualUsuarioDto[] | PlanActualUsuarioDto | null | undefined): PlanInfo {
    const first = Array.isArray(items) ? items[0] : (items ?? null);
    if (!first) return WALLET_PLAN;

    const name = this.cleanText(first.nombrePlanDTO) || WALLET_PLAN.name;
    const cost = this.toNumber(first.precioPlanDTO);
    const renewalDate = this.formatApiDate(first.fechaRenovacionDTO) || WALLET_PLAN.renewalDate;
    const paid = cost > 0;

    return {
      ...WALLET_PLAN,
      id: this.toPlanId(name),
      name,
      priceLabel: this.formatPlanPrice(cost, name),
      renewalDate,
      nextChargeLabel: paid ? `Proximo cobro: ${renewalDate}` : 'Proximo cobro pendiente',
      status: paid ? 'active' : 'free',
      description: paid
        ? 'Administra tu plan, metodos de pago y renovaciones.'
        : 'Plan gratuito activo.',
      autoRenewEnabled: false,
    };
  }

  private mapSubscriptionStateFromApi(
    items: SubscriptionStatusDto[] | SubscriptionStatusDto | null | undefined
  ): SubscriptionStatusDto | null {
    const first = Array.isArray(items) ? items[0] : (items ?? null);
    return first ?? null;
  }

  private applySubscriptionState(plan: PlanInfo, state: SubscriptionStatusDto | null): PlanInfo {
    if (!state) {
      return plan;
    }

    const paidPlan = plan.status !== 'free';
    const subscriptionActive = this.toBoolean(state.suscripcionActivaDTO);
    const autoRenewEnabled = this.toBoolean(state.renovacionAutomaticaActivaDTO);

    return {
      ...plan,
      autoRenewEnabled,
      status: paidPlan && !subscriptionActive ? 'payment_failed' : plan.status,
    };
  }

  private toPerks(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value
        .map((item) => this.cleanText(item))
        .filter((item) => item.length > 0);
    }

    return [];
  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      return normalized === 'true' || normalized === '1';
    }
    return false;
  }

  private toPositiveInteger(value: unknown): number | null {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
      return value;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isInteger(parsed) && parsed > 0) return parsed;
    }

    return null;
  }

  private cleanText(value: unknown): string {
    if (typeof value !== 'string') return '';
    return value.trim();
  }

  private formatPlanPrice(cost: number, planName: string): string {
    const money = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(cost);

    const normalizedName = planName.toLowerCase();
    if (cost <= 0) return `${money}`;
    if (normalizedName.includes('anual') || normalizedName.includes('year')) return `${money}/año`;

    return `${money}/mes`;
  }

  private formatApiDate(value: unknown): string {
    if (typeof value !== 'string' || !value.trim().length) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(parsed);
  }

  private toPlanId(name: string): string {
    const normalized = name.toLowerCase();
    if (normalized.includes('gratis') || normalized.includes('free')) return 'plan-free';
    if (normalized.includes('oro') || normalized.includes('scale') || normalized.includes('anual')) return 'plan-scale';
    return 'plan-pro';
  }

  private isFreePlanId(planId: number): boolean {
    const fromList = this.plansSubject.value.find(
      (plan) => this.toPositiveInteger(plan.id) === planId
    );

    if (fromList) {
      const normalizedName = this.normalizeComparable(fromList.name);
      return normalizedName.includes('gratis') || normalizedName.includes('free');
    }

    return false;
  }

  private parseMutationResult(
    response: ChangePlanUsuarioDto[] | ChangePlanUsuarioDto | null | undefined,
    fallbackSuccessMessage: string
  ): { ok: boolean; message: string } {
    const first = Array.isArray(response) ? response[0] : response;

    if (!first) {
      return { ok: true, message: fallbackSuccessMessage };
    }

    const resultado = this.toNullableInteger(first.resultadoDTO);
    const ok = resultado === null ? true : resultado === 1;
    const message = this.cleanText(first.mensajeDTO) || fallbackSuccessMessage;

    return { ok, message };
  }

  private toNullableInteger(value: unknown): number | null {
    if (typeof value === 'number' && Number.isInteger(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isInteger(parsed)) return parsed;
    }
    return null;
  }

  private normalizeComparable(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private setDefaultCardRequest(cardId: string): Observable<void> {
    return this.api.post<void>(
      API_ENDPOINTS.wallet.setDefaultCard,
      this.requestContext.withUserId({ idMetodoPago: cardId })
    );
  }

  private loadCardsFromApi(): Observable<CardItem[]> {
    return this.api
      .post<MetodoPagoStripeDto[]>(
        API_ENDPOINTS.wallet.cards,
        this.requestContext.withUserId()
      )
      .pipe(map((items) => this.mapCardsFromApi(items)));
  }

  private loadSecurityFromApi(): Observable<SecurityInfo> {
    const userId = this.requestContext.getUserIdOrNull();
    if (userId === null) {
      return of({
        ...WALLET_SECURITY,
        recentSessions: [],
      });
    }

    const payload = { idUsuario: userId };

    return forkJoin({
      status: this.authService.getMfaStatus(payload),
      sessions: this.authService.getMfaActiveSessions(payload),
    }).pipe(
      map(({ status, sessions }) => ({
        ...WALLET_SECURITY,
        mfaEnabled: status.enabled || status.configured,
        recentSessions: sessions.map((session) => ({
          id: session.id,
          device: session.device,
          location: this.normalizeSessionLocation(session.location),
          lastActive: this.formatSessionLastActive(session.lastActiveAt),
        })),
      }))
    );
  }

  private normalizeSessionLocation(value: string): string {
    const location = this.cleanText(value);
    return location || 'Ubicacion no disponible';
  }

  private formatSessionLastActive(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return 'Reciente';
    }

    const diffMs = Date.now() - parsed.getTime();
    if (diffMs < 60_000) return 'Hace un momento';

    const diffMinutes = Math.floor(diffMs / 60_000);
    if (diffMinutes < 60) {
      return diffMinutes === 1 ? 'Hace 1 minuto' : `Hace ${diffMinutes} minutos`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return diffHours === 1 ? 'Hace 1 hora' : `Hace ${diffHours} horas`;
    }

    const diffDays = Math.floor(diffHours / 24);
    return diffDays === 1 ? 'Hace 1 dia' : `Hace ${diffDays} dias`;
  }

  private mapInvoicesFromApi(items: StripeHistorialPagoDto[] | null | undefined): InvoiceItem[] {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    return items.map((item, index) => ({
        id: this.cleanText(item.idPagoDTO) || ('pay-' + (index + 1)),
      date: this.formatPaymentDate(item.fechaDTO),
      concept: this.cleanText(item.conceptoDTO) || 'Pago con tarjeta',
      amount: this.formatMoney(
        this.toNumber(item.montoDTO),
        this.cleanText(item.monedaDTO) || 'mxn'
      ),
      status: this.normalizeInvoiceStatus(item.estatusDTO),
      receiptUrl: this.cleanText(item.receiptUrlDTO),
    }));
  }

  private formatMoney(amount: number, currency: string): string {
    const normalizedCurrency = currency.trim().toUpperCase() || 'MXN';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: normalizedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  private formatPaymentDate(value: unknown): string {
    if (typeof value !== 'string' || !value.trim().length) {
      return '';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsed);
  }

  private normalizeInvoiceStatus(value: unknown): InvoiceStatus {
    const normalized = this.cleanText(value).toLowerCase();
    if (normalized === 'failed') return 'failed';
    if (normalized === 'refunded') return 'refunded';
    return 'paid';
  }

  private pushGlobalNotification(
    message: string,
    tone: UploadNotificationSnapshot['tone'],
    ttlMs: number
  ): void {
    const notifications = this.notificationService.getNotifications();
    const next: UploadNotificationSnapshot = {
      id: ++this.notificationSeq,
      tone,
      message,
      expiresAt: Date.now() + ttlMs,
    };

    this.notificationService.setNotifications([...notifications, next]);
  }

  private mapCardsFromApi(items: MetodoPagoStripeDto[] | null | undefined): CardItem[] {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    return items.map((item, index) => ({
      id: this.cleanText(item.idMetodoPagoDTO) || `pm-${index + 1}`,
      cardholderName: this.cleanText(item.nombreTitularDTO),
      brand: this.cleanText(item.marcaDTO) || 'Tarjeta',
      last4: this.cleanText(item.ultimos4DTO),
      expMonth: this.toPositiveInteger(item.mesExpiracionDTO) ?? 0,
      expYear: this.toPositiveInteger(item.anioExpiracionDTO) ?? 0,
      isDefault: this.toBoolean(item.esPredeterminadaDTO),
    }));
  }
}

type PlanBeneficioVinculacionDto = {
  idPlanDTO?: number | string;
  nombrePlanDTO?: string;
  costoPlanDTO?: number | string;
  planVinculadoUsuarioDTO?: boolean | number | string;
  beneficiosDTO?: unknown;
};

type PlanActualUsuarioDto = {
  nombrePlanDTO?: string;
  precioPlanDTO?: number | string;
  fechaRenovacionDTO?: string;
};

type ChangePlanUsuarioDto = {
  resultadoDTO?: number | string;
  mensajeDTO?: string;
};

type StripePublicConfigDto = {
  publishableKeyDTO?: string;
};

type StripeSetupIntentDto = {
  clientSecretDTO?: string;
};

type CobrarCambioPlanStripeDto = {
  exitoDTO?: boolean | number | string;
  mensajeDTO?: string;
};

type MetodoPagoStripeDto = {
  idMetodoPagoDTO?: string;
  nombreTitularDTO?: string;
  marcaDTO?: string;
  ultimos4DTO?: string;
  mesExpiracionDTO?: number | string;
  anioExpiracionDTO?: number | string;
  esPredeterminadaDTO?: boolean | number | string;
};




type StripeHistorialPagoDto = {
  idPagoDTO?: string;
  fechaDTO?: string;
  conceptoDTO?: string;
  montoDTO?: number | string;
  monedaDTO?: string;
  estatusDTO?: string;
  receiptUrlDTO?: string;
};

type SubscriptionStatusDto = {
  suscripcionActivaDTO?: boolean | number | string;
  renovacionAutomaticaActivaDTO?: boolean | number | string;
};

type ActualizarRenovacionAutomaticaDto = {
  mensajeDTO?: string;
  renovacionAutomaticaActivaDTO?: boolean | number | string;
};





