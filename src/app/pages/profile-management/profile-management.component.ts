import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import {
  ChangePlanModalComponent,
  PlanFeature,
  PlanOption,
} from './subscription/change-plan-modal.component';
import {
  CancelSubscriptionModalComponent,
} from './subscription/cancel-subscription-modal.component';
import {
  CurrentPlanCardComponent,
  PlanUsageSummary,
} from './subscription/current-plan-card.component';
import {
  SubscriptionStatusCardComponent,
  SubscriptionStatusSummary,
} from './subscription/subscription-status-card.component';
import { UsageCardComponent, UsageMetric } from './subscription/usage-card.component';
import {
  PaymentMethodCardComponent,
  PaymentMethodSummary,
} from './subscription/payment-method-card.component';
import {
  BillingHistoryItem,
  BillingHistoryTableComponent,
} from './subscription/billing-history-table.component';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { ApiClientService } from '../../core/http/api-client.service';
import { ApiRequestContextService } from '../../core/http/api-request-context.service';
import { API_ENDPOINTS } from '../../core/config/api-endpoints';
import { API_CONFIG, ApiRuntimeConfig, buildApiUrl } from '../../core/config/api.config';
import { WalletApiService } from '../wallet/services/wallet-api.service';
import { CardItem } from '../wallet/data/wallet.models';

type Usuario = {
  id_usuario: number;
  nombre: string;
  email: string;
  stripe_customer_id: string;
  fecha_registro: string;
  ultimo_acceso: string;
  tickets_generados: number;
  tickets_almacenados: number;
  facturas_emitidas: number;
  estatus: string;
  mfa_enabled: boolean;
  bloqueado: boolean;
};

type Suscripcion = {
  id_suscripcion: number;
  id_usuario: number;
  id_plan: number;
  estatus: 'activa' | 'por_vencer' | 'cancelada' | 'vencida';
  fecha_inicio: string;
  fecha_fin: string;
  costo_pagado: number;
  periodo_suscripcion: string;
  renovacion_automatica: boolean;
  stripe_subscription_id: string;
  stripe_subscription_item_id: string;
};

type Notificacion = {
  id_usuario: number;
  mensaje: string;
  fecha: string;
  leido: boolean;
};

type SuscripcionResumenDto = {
  planActualDTO?: string;
  fechaInicioPlanDTO?: string;
  fechaFinPlanDTO?: string;
  ticketsRelacionadosDTO?: number | string;
  ticketsLimitePlanDTO?: number | string;
  porcentajeUsoTicketsDTO?: number | string;
  fechaRenovacionDTO?: string;
  diasRestantesPlanDTO?: number | string;
};

type ResumenEstatusTicketsDto = {
  ticketsGuardadosDTO?: number | string;
  ticketsPendientesDTO?: number | string;
  ticketsFacturadosDTO?: number | string;
  ticketsCanceladosDTO?: number | string;
  totalTicketsDTO?: number | string;
  capacidadPlanTicketsDTO?: number | string;
  porcentajeUsoCapacidadPlanDTO?: number | string;
};

type BeneficioPlanDto = {
  idBeneficiosDTO?: number | string;
  idPlanDTO?: number | string;
  beneficioDTO?: string;
  beneficioEstatusDTO?: boolean | string | number;
};

type PlanDisponibleDto = {
  idPlanDTO?: number | string;
  nombrePlanDTO?: string;
  costoPlanDTO?: number | string;
  planVinculadoUsuarioDTO?: boolean | number | string;
  beneficiosDTO?: unknown;
};

type AvailablePlanCard = {
  id: string;
  nombre: string;
  periodo: string;
  costo: number;
};

type ApiEnvelope<T> = {
  result?: boolean;
  code?: number | string;
  message?: string;
  data?: T | T[] | null;
};

type EstadoSuscripcionDto = {
  idSuscripcionDTO?: number | string;
  idUsuarioDTO?: number | string;
  idPlanDTO?: number | string;
  estatusPagoDTO?: number | string;
  suscripcionActivaDTO?: number | string | boolean;
  renovacionAutomaticaDTO?: number | string;
  renovacionAutomaticaActivaDTO?: number | string | boolean;
  estatusDTO?: string;
  estadoSuscripcionDTO?: string;
  fechaInicioDTO?: string;
  fechaFinDTO?: string;
  proximaRenovacionDTO?: string;
  costoPagadoDTO?: number | string;
  costoSuscripcionDTO?: number | string;
  periodoSuscripcionDTO?: string;
  stripeSubscriptionIdDTO?: string;
  stripeSubscriptionItemIdDTO?: string;
  stripeIdDTO?: string;
};

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    CurrentPlanCardComponent,
    SubscriptionStatusCardComponent,
    UsageCardComponent,
    PaymentMethodCardComponent,
    BillingHistoryTableComponent,
    ChangePlanModalComponent,
    CancelSubscriptionModalComponent,
  ],
  templateUrl: './profile-management.component.html',
})
export class ProfileManagementComponent implements OnInit {
  private readonly api = inject(ApiClientService);
  private readonly http = inject(HttpClient);
  private readonly requestContext = inject(ApiRequestContextService);
  private readonly apiConfig = inject<ApiRuntimeConfig>(API_CONFIG);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly walletApi = inject(WalletApiService);

  // UI states
  loading = false;
  hasError = false;
  showChangePlanModal = false;
  showCancelModal = false;
  private currentUserId: number | null = null;

  // Mock data modeled from DB tables
  usuarioActual: Usuario = {
    id_usuario: 1024,
    nombre: 'Musharof Chowdhury',
    email: 'musharof@tailadmin.com',
    stripe_customer_id: 'cus_9xYZaBCdEfGh12',
    fecha_registro: '2025-10-16',
    ultimo_acceso: '2026-01-27',
    tickets_generados: 38,
    tickets_almacenados: 41,
    facturas_emitidas: 26,
    estatus: 'activo',
    mfa_enabled: false,
    bloqueado: false,
  };

  suscripcionActual: Suscripcion | null = {
    id_suscripcion: 0,
    id_usuario: 0,
    id_plan: 0,
    estatus: 'vencida',
    fecha_inicio: '',
    fecha_fin: '',
    costo_pagado: 0,
    periodo_suscripcion: '',
    renovacion_automatica: false,
    stripe_subscription_id: '',
    stripe_subscription_item_id: '',
  };

  planesDisponibles: PlanOption[] = [
    {
      id_plan: 1,
      nombre: 'Starter',
      tipo_periodo: 'mensual',
      costo: 199,
      moneda: 'MXN',
      limite_busquedas: 200,
      tickets_generados: 25,
      facturas_emitidas: 20,
      tickets_almacenados: 50,
      descripcion: 'Ideal para comenzar',
      estatus: 'activo',
      caracteristicas: [
        { id_plan: 1, texto: 'OCR básico', orden: 1, activo: true },
        { id_plan: 1, texto: 'Exportación CSV', orden: 2, activo: true },
        { id_plan: 1, texto: 'Soporte por correo', orden: 3, activo: true },
      ],
    },
    {
      id_plan: 2,
      nombre: 'Pro',
      tipo_periodo: 'mensual',
      costo: 399,
      moneda: 'MXN',
      limite_busquedas: 500,
      tickets_generados: 50,
      facturas_emitidas: 40,
      tickets_almacenados: 150,
      descripcion: 'Para equipos en crecimiento',
      estatus: 'activo',
      caracteristicas: [
        { id_plan: 2, texto: 'OCR avanzado', orden: 1, activo: true },
        { id_plan: 2, texto: 'Validaciones fiscales', orden: 2, activo: true },
        { id_plan: 2, texto: 'Alertas inteligentes', orden: 3, activo: true },
        { id_plan: 2, texto: 'Soporte prioritario', orden: 4, activo: true },
      ],
    },
    {
      id_plan: 3,
      nombre: 'Scale',
      tipo_periodo: 'anual',
      costo: 3499,
      moneda: 'MXN',
      limite_busquedas: 5000,
      tickets_generados: 500,
      facturas_emitidas: 400,
      tickets_almacenados: 2000,
      descripcion: 'Máximo rendimiento',
      estatus: 'activo',
      caracteristicas: [
        { id_plan: 3, texto: 'OCR ilimitado', orden: 1, activo: true },
        { id_plan: 3, texto: 'Reglas personalizadas', orden: 2, activo: true },
        { id_plan: 3, texto: 'Múltiples usuarios', orden: 3, activo: true },
        { id_plan: 3, texto: 'Integraciones premium', orden: 4, activo: true },
      ],
    },
  ];

  caracteristicasPlanActual: PlanFeature[] = [];

  historialPagos: BillingHistoryItem[] = [
    {
      id: 'pay_001',
      fecha: '01 feb. 2026',
      concepto: 'Plan Pro - Renovacion mensual',
      monto: '$399.00 MXN',
      status: 'pagado',
      hasReceipt: true,
    },
    {
      id: 'pay_002',
      fecha: '01 ene. 2026',
      concepto: 'Plan Pro - Renovacion mensual',
      monto: '$399.00 MXN',
      status: 'pagado',
      hasReceipt: true,
    },
    {
      id: 'pay_003',
      fecha: '01 dic. 2025',
      concepto: 'Plan Pro - Renovacion mensual',
      monto: '$399.00 MXN',
      status: 'en_proceso',
      hasReceipt: false,
    },
    {
      id: 'pay_004',
      fecha: '01 nov. 2025',
      concepto: 'Plan Pro - Renovacion mensual',
      monto: '$399.00 MXN',
      status: 'fallido',
      hasReceipt: false,
    },
  ];

  notificaciones: Notificacion[] = [
    {
      id_usuario: 1024,
      mensaje: 'Tu suscripción se renovará en 5 días.',
      fecha: '2026-01-27',
      leido: false,
    },
  ];

  private apiPlanSummary: PlanUsageSummary | null = null;
  private apiUsageMetrics: UsageMetric[] | null = null;
  private apiUsageTotalTickets = 0;
  private apiUsageCapacityTickets = 0;
  private apiUsageCapacityPercent = 0;
  private apiAvailablePlans: AvailablePlanCard[] = [];
  private hasLoadedAvailablePlans = false;
  private paymentCards: CardItem[] = [];

  constructor() {
    this.syncPlanFeatures();
  }

  ngOnInit(): void {
    this.currentUserId = this.requestContext.getUserIdOrDefault();
    this.walletApi.cards$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cards) => {
        this.paymentCards = cards;
      });
    this.loadSubscriptionPageData(this.currentUserId);
  }

  get planActual(): PlanOption | null {
    if (!this.suscripcionActual) return null;
    return this.planesDisponibles.find((p) => p.id_plan === this.suscripcionActual?.id_plan) ?? null;
  }

  get metodoPagoDefault(): PaymentMethodSummary | null {
    const method = this.paymentCards.find((m) => m.isDefault) ?? this.paymentCards[0];
    if (!method) return null;
    return {
      brand: method.brand,
      last4: method.last4,
      expMonth: method.expMonth,
      expYear: method.expYear,
      isDefault: method.isDefault,
      status: 'Activa',
      autoRenewEnabled: this.suscripcionActual?.renovacion_automatica ?? false,
    };
  }

  get planSummary(): PlanUsageSummary | null {
    if (this.apiPlanSummary) {
      return this.apiPlanSummary;
    }

    if (!this.suscripcionActual || !this.planActual) return null;

    return {
      planName: this.planActual.nombre,
      periodoLabel: `${this.planActual.tipo_periodo === 'anual' ? 'Plan anual' : 'Plan mensual'} activo`,
      fechaInicio: this.formatDate(this.suscripcionActual.fecha_inicio),
      fechaFin: this.formatDate(this.suscripcionActual.fecha_fin),
      costoLabel: this.formatCurrency(this.suscripcionActual.costo_pagado, this.planActual.moneda),
      consumoPorcentaje: 80,
      consumoLabel: '40 / 50 tickets',
      diasRestantesLabel: 'Restan 10 días',
      renovacionLabel: `Renueva el ${this.formatDate(this.suscripcionActual.fecha_fin)}`,
    };
  }

  get statusSummary(): SubscriptionStatusSummary | null {
    if (!this.suscripcionActual) return null;

    return {
      status: this.suscripcionActual.estatus,
      statusLabel: this.getStatusLabel(this.suscripcionActual.estatus),
      renewalLabel: this.getRenewalLabel(this.suscripcionActual),
      nextRenewalDate: this.safeFormatDate(this.suscripcionActual.fecha_fin),
      costoLabel: `${this.formatCurrency(this.suscripcionActual.costo_pagado, 'MXN')} / ${this.resolvePeriodUnit(this.suscripcionActual.periodo_suscripcion)}`,
      stripeIdLabel: this.suscripcionActual.stripe_subscription_id || 'N/A',
    };
  }

  get usageMetrics(): UsageMetric[] {
    if (this.apiUsageMetrics) {
      return this.apiUsageMetrics;
    }

    if (!this.planActual) return [];

    return [
      {
        key: 'busquedas',
        label: 'Búsquedas usadas',
        used: 420,
        limit: this.planActual.limite_busquedas,
        helper: 'Incluye OCR y búsquedas por texto',
        tone: 'brand',
      },
      {
        key: 'tickets_generados',
        label: 'Tickets generados',
        used: this.usuarioActual.tickets_generados,
        limit: this.planActual.tickets_generados,
        helper: 'Tickets nuevos procesados este periodo',
        tone: 'emerald',
      },
      {
        key: 'facturas_emitidas',
        label: 'Facturas emitidas',
        used: this.usuarioActual.facturas_emitidas,
        limit: this.planActual.facturas_emitidas,
        helper: 'Facturas timbradas correctamente',
        tone: 'violet',
      },
    ];
  }

  get usageSummaryTopLabel(): string {
    if (this.apiUsageCapacityTickets > 0 || this.apiUsageTotalTickets > 0) {
      return `${this.apiUsageTotalTickets} / ${this.apiUsageCapacityTickets}`;
    }

    return 'Actualizado hoy';
  }

  get usageSummaryBottomLabel(): string {
    if (this.apiUsageCapacityTickets > 0 || this.apiUsageTotalTickets > 0) {
      return `${this.apiUsageCapacityPercent}% del plan`;
    }

    return '';
  }

  get hasActiveSubscription(): boolean {
    return !!this.suscripcionActual && this.suscripcionActual.estatus !== 'vencida';
  }

  get availablePlansForCard(): AvailablePlanCard[] {
    if (this.hasLoadedAvailablePlans) {
      return this.apiAvailablePlans;
    }

    if (this.apiAvailablePlans.length) {
      return this.apiAvailablePlans;
    }

    return this.planesDisponibles
      .filter((plan) => plan.id_plan !== this.planActual?.id_plan)
      .map((plan) => ({
        id: String(plan.id_plan),
        nombre: plan.nombre,
        periodo: plan.tipo_periodo === 'anual' ? 'Plan anual' : 'Plan mensual',
        costo: plan.costo,
      }));
  }

  // UI actions
  openChangePlanModal(): void {
    this.showChangePlanModal = true;
  }

  goToWalletPlans(): void {
    void this.router.navigate(['/wallet'], {
      fragment: 'wallet-plans',
      queryParams: { highlight: 'subscription-card' },
    });
  }

  closeChangePlanModal(): void {
    this.showChangePlanModal = false;
  }

  openCancelModal(): void {
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
  }

  cambiarPlan(plan: PlanOption): void {
    if (!this.suscripcionActual) return;
    this.suscripcionActual = {
      ...this.suscripcionActual,
      id_plan: plan.id_plan,
      costo_pagado: plan.costo,
    };
    this.syncPlanFeatures();
    this.closeChangePlanModal();
  }

  cancelarSuscripcion(): void {
    this.executeSubscriptionToggle('cancelar');
  }

  reactivarSuscripcion(): void {
    this.executeSubscriptionToggle('reactivar');
  }

  retryLoad(): void {
    const userId = this.currentUserId ?? this.requestContext.getUserIdOrDefault();
    this.loadSubscriptionPageData(userId);
  }

  descargarRecibo(item: BillingHistoryItem): void {
    console.log('Descargar recibo', item.id);
  }

  // helpers
  private syncPlanFeatures(): void {
    this.caracteristicasPlanActual = this.planActual?.caracteristicas ?? [];
  }

  private getStatusLabel(status: Suscripcion['estatus']): string {
    switch (status) {
      case 'activa':
        return 'Activa';
      case 'por_vencer':
        return 'Por vencer';
      case 'cancelada':
        return 'Cancelada';
      default:
        return 'Vencida';
    }
  }

  private getRenewalLabel(subscription: Suscripcion): string {
    if (subscription.estatus === 'cancelada') {
      return 'Tu acceso se mantendrá hasta el fin del periodo';
    }
    if (subscription.estatus === 'por_vencer') {
      return 'Recomendado renovar antes del fin del periodo';
    }
    if (!subscription.renovacion_automatica) {
      return 'Renovacion automatica desactivada';
    }
    return 'Renovacion automatica programada';
  }

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  private formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  private refreshSubscriptionStateAndSummary(userId: number): void {
    this.loading = true;
    this.hasError = false;

    forkJoin({
      statusOk: this.fetchSubscriptionStatus(userId),
      summaryOk: this.fetchSubscriptionSummary(userId),
    }).subscribe(({ statusOk, summaryOk }) => {
      this.loading = false;
      this.hasError = !statusOk && !summaryOk;
    });
  }

  private executeSubscriptionToggle(action: 'cancelar' | 'reactivar'): void {
    const userId = this.currentUserId ?? this.requestContext.getUserIdOrDefault();
    const nextEstatusPago = action === 'cancelar' ? 0 : 1;

    const payload: Record<string, unknown> = {
      idUsuario: userId,
      estatus: nextEstatusPago,
      estatusPago: nextEstatusPago,
    };
    const fallbackPayload: Record<string, unknown> = {
      idUsuario: userId,
      estatusDTO: nextEstatusPago,
      estatusPagoDTO: nextEstatusPago,
    };

    this.loading = true;
    this.hasError = false;

    this.postRaw<unknown>(API_ENDPOINTS.wallet.cancelPlan, payload)
      .pipe(
        catchError((error) => {
          if (error?.status === 400) {
            return this.postRaw<unknown>(API_ENDPOINTS.wallet.cancelPlan, fallbackPayload);
          }

          this.loading = false;
          this.hasError = true;
          return of(null);
        })
      )
      .subscribe((response) => {
        if (!this.isSuccessResponse(response)) {
          this.loading = false;
          this.hasError = true;
          return;
        }

        if (action === 'cancelar') {
          this.closeCancelModal();
        }

        this.loadSubscriptionPageData(userId);
      });
  }

  private loadSubscriptionPageData(userId: number): void {
    this.currentUserId = userId;
    this.refreshSubscriptionStateAndSummary(userId);
    this.loadSubscriptionTicketStatusSummary(userId);
    this.loadSubscriptionPlanBenefits(userId);
    this.loadSubscriptionAvailablePlans(userId);
  }

  private loadSubscriptionTicketStatusSummary(userId: number): void {
    this.api
      .post<ResumenEstatusTicketsDto[] | ResumenEstatusTicketsDto>(
        API_ENDPOINTS.wallet.subscriptionTicketStatusSummary,
        { idUsuario: userId }
      )
      .pipe(catchError(() => of([] as ResumenEstatusTicketsDto[])))
      .subscribe((response) => {
        const items = this.normalizeToArray(response);
        const first = items[0];
        if (!first) return;

        const total = Math.trunc(this.toPositiveNumber(first.totalTicketsDTO));
        const capacity = Math.trunc(this.toPositiveNumber(first.capacidadPlanTicketsDTO));
        const percent = Math.min(100, Math.max(0, this.toPositiveNumber(first.porcentajeUsoCapacidadPlanDTO)));
        const limitForStatus = Math.max(1, capacity || total);

        this.apiUsageTotalTickets = total;
        this.apiUsageCapacityTickets = capacity;
        this.apiUsageCapacityPercent = Math.round(percent);

      this.apiUsageMetrics = [
        {
          key: 'tickets_guardados',
            label: 'Tickets guardados',
            used: Math.trunc(this.toPositiveNumber(first.ticketsGuardadosDTO)),
            limit: limitForStatus,
            displayLimit: capacity,
            helper: 'Tickets guardados del total actual',
            tone: 'emerald',
          },
          {
            key: 'tickets_pendientes',
            label: 'Tickets pendientes',
            used: Math.trunc(this.toPositiveNumber(first.ticketsPendientesDTO)),
            limit: limitForStatus,
            displayLimit: capacity,
            helper: 'Tickets pendientes del total actual',
            tone: 'yellow',
          },
          {
            key: 'tickets_facturados',
            label: 'Tickets facturados',
            used: Math.trunc(this.toPositiveNumber(first.ticketsFacturadosDTO)),
            limit: limitForStatus,
            displayLimit: capacity,
            helper: 'Tickets facturados del total actual',
            tone: 'violet',
          },
          {
            key: 'tickets_cancelados',
            label: 'Tickets cancelados',
            used: Math.trunc(this.toPositiveNumber(first.ticketsCanceladosDTO)),
            limit: limitForStatus,
            displayLimit: capacity,
            helper: 'Tickets cancelados del total actual',
            tone: 'red',
        },
      ];

      this.syncPlanSummaryWithTicketStatus(total, capacity);
    });
  }

  private loadSubscriptionPlanBenefits(userId: number): void {
    this.api
      .post<BeneficioPlanDto[] | BeneficioPlanDto>(
        API_ENDPOINTS.wallet.subscriptionPlanBenefits,
        { idUsuario: userId }
      )
      .pipe(catchError(() => of([] as BeneficioPlanDto[])))
      .subscribe((response) => {
        const items = this.normalizeToArray(response);
        if (!items.length) return;

        const mapped: PlanFeature[] = items
          .filter((item) => this.toBoolean(item.beneficioEstatusDTO))
          .map((item, index) => ({
            id_plan: Math.trunc(this.toPositiveNumber(item.idPlanDTO)),
            texto: this.cleanText(item.beneficioDTO, ''),
            orden: index + 1,
            activo: true,
          }))
          .filter((item) => item.texto.length > 0);

        if (mapped.length) {
          this.caracteristicasPlanActual = mapped;
        }
      });
  }

  private loadSubscriptionAvailablePlans(userId: number): void {
    this.api
      .post<PlanDisponibleDto[] | PlanDisponibleDto>(
        API_ENDPOINTS.wallet.plans,
        { idUsuario: userId }
      )
      .pipe(catchError(() => of([] as PlanDisponibleDto[])))
      .subscribe((response) => {
        this.hasLoadedAvailablePlans = true;

        const items = this.normalizeToArray(response);
        if (!items.length) {
          this.apiAvailablePlans = [];
          return;
        }

        const mapped = items
          .map((item, index) => ({
            id: String(item.idPlanDTO ?? `api-plan-${index + 1}`),
            nombre: this.cleanText(item.nombrePlanDTO, ''),
            periodo: this.toBoolean(item.planVinculadoUsuarioDTO)
              ? 'Plan actual'
              : 'Plan mensual',
            costo: this.toPositiveNumber(item.costoPlanDTO),
          }))
          .filter((plan) => plan.nombre.length > 0);

        this.apiAvailablePlans = mapped;
      });
  }

  private fetchSubscriptionStatus(userId: number): Observable<boolean> {
    const payload = { idUsuario: userId };
    return this.postRaw<EstadoSuscripcionDto>(API_ENDPOINTS.wallet.subscriptionStatus, payload).pipe(
      map((response) => {
        if (!this.isSuccessResponse(response)) return false;

        const first = this.normalizeApiDataToArray(response.data)[0];
        if (!first) return false;

        this.applySubscriptionStatus(first, userId);
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  private fetchSubscriptionSummary(userId: number): Observable<boolean> {
    const payload = { idUsuario: userId };
    return this.postRaw<SuscripcionResumenDto>(API_ENDPOINTS.wallet.subscriptionSummary, payload).pipe(
      map((response) => {
        if (!this.isSuccessResponse(response)) return false;

        const first = this.normalizeApiDataToArray(response.data)[0];
        if (!first) return false;

        this.apiPlanSummary = this.mapApiSummary(first);
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  private postRaw<T>(path: string, payload: Record<string, unknown>): Observable<ApiEnvelope<T>> {
    const url = buildApiUrl(this.apiConfig, path);
    return this.http.post<ApiEnvelope<T>>(url, payload);
  }

  private isSuccessResponse(response: ApiEnvelope<unknown> | null): boolean {
    if (!response) return false;
    return response.result === true && Number(response.code) === 200;
  }

  private normalizeApiDataToArray<T>(value: T[] | T | null | undefined): T[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'object' && value !== null) return [value];
    return [];
  }

  private applySubscriptionStatus(dto: EstadoSuscripcionDto, userId: number): void {
    const estatusPago =
      this.toNullableNumber(dto.estatusPagoDTO) ??
      this.toNullableNumber(dto.suscripcionActivaDTO);
    const statusText =
      this.cleanText(dto.estatusDTO, '') ||
      this.cleanText(dto.estadoSuscripcionDTO, '') ||
      '';
    const normalizedStatus = this.normalizeSubscriptionStatus(statusText, estatusPago);

    const current = this.suscripcionActual ?? {
      id_suscripcion: 0,
      id_usuario: userId,
      id_plan: 0,
      estatus: 'vencida' as const,
      fecha_inicio: '',
      fecha_fin: '',
      costo_pagado: 0,
      periodo_suscripcion: '',
      renovacion_automatica: false,
      stripe_subscription_id: '',
      stripe_subscription_item_id: '',
    };

    this.suscripcionActual = {
      ...current,
      id_suscripcion: Math.trunc(this.toPositiveNumber(dto.idSuscripcionDTO)) || current.id_suscripcion,
      id_usuario: Math.trunc(this.toPositiveNumber(dto.idUsuarioDTO)) || current.id_usuario,
      id_plan: Math.trunc(this.toPositiveNumber(dto.idPlanDTO)) || current.id_plan,
      estatus: normalizedStatus,
      fecha_inicio: this.cleanText(dto.fechaInicioDTO, current.fecha_inicio),
      fecha_fin: this.cleanText(dto.fechaFinDTO, this.cleanText(dto.proximaRenovacionDTO, current.fecha_fin)),
      costo_pagado: this.toPositiveNumber(dto.costoPagadoDTO) || this.toPositiveNumber(dto.costoSuscripcionDTO) || current.costo_pagado,
      periodo_suscripcion: this.cleanText(dto.periodoSuscripcionDTO, current.periodo_suscripcion),
      renovacion_automatica: this.toBoolean(dto.renovacionAutomaticaActivaDTO ?? dto.renovacionAutomaticaDTO),
      stripe_subscription_id: this.cleanText(
        dto.stripeSubscriptionIdDTO,
        this.cleanText(dto.stripeIdDTO, current.stripe_subscription_id)
      ),
      stripe_subscription_item_id: this.cleanText(dto.stripeSubscriptionItemIdDTO, current.stripe_subscription_item_id),
    };
  }

  private normalizeSubscriptionStatus(value: string, estatusPago: number | null): Suscripcion['estatus'] {
    if (estatusPago === 0) return 'cancelada';
    if (estatusPago === 1) return 'activa';

    const normalized = value.trim().toLowerCase();

    if (normalized.includes('cancel')) return 'cancelada';
    if (normalized.includes('por_vencer') || normalized.includes('por vencer')) return 'por_vencer';
    if (normalized.includes('venc')) return 'vencida';
    if (normalized.includes('activ')) return 'activa';

    return this.suscripcionActual?.estatus ?? 'vencida';
  }

  private toNullableNumber(value: unknown): number | null {
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return null;
  }

  private mapApiSummary(dto: SuscripcionResumenDto): PlanUsageSummary {
    const usedFromSummary = this.toPositiveNumber(dto.ticketsRelacionadosDTO);
    const limitFromSummary = this.toPositiveNumber(dto.ticketsLimitePlanDTO);
    const used = usedFromSummary > 0 ? usedFromSummary : this.apiUsageTotalTickets;
    const limit = limitFromSummary > 0 ? limitFromSummary : this.apiUsageCapacityTickets;
    const percentFromApi = this.toPositiveNumber(dto.porcentajeUsoTicketsDTO);
    const consumoPorcentaje = percentFromApi > 0
      ? Math.min(100, Math.max(0, percentFromApi))
      : (limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0);
    const diasRestantes = Math.max(0, Math.trunc(this.toPositiveNumber(dto.diasRestantesPlanDTO)));
    const fechaRenovacion = dto.fechaRenovacionDTO || dto.fechaFinPlanDTO || '';

    return {
      planName: this.cleanText(dto.planActualDTO, 'Sin plan'),
      periodoLabel: this.resolvePeriodLabel(dto.fechaInicioPlanDTO, dto.fechaFinPlanDTO),
      fechaInicio: this.safeFormatDate(dto.fechaInicioPlanDTO),
      fechaFin: this.safeFormatDate(dto.fechaFinPlanDTO),
      costoLabel: '--',
      consumoPorcentaje,
      consumoLabel: `${Math.trunc(used)} / ${Math.trunc(limit)} tickets`,
      diasRestantesLabel: `Restan ${diasRestantes} días`,
      renovacionLabel: `Renueva el ${this.safeFormatDate(fechaRenovacion)}`,
    };
  }

  private syncPlanSummaryWithTicketStatus(total: number, capacity: number): void {
    if (!this.apiPlanSummary) return;

    const used = Math.max(0, Math.trunc(total));
    const limit = Math.max(0, Math.trunc(capacity));
    const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

    this.apiPlanSummary = {
      ...this.apiPlanSummary,
      consumoLabel: `${used} / ${limit} tickets`,
      consumoPorcentaje: percent,
    };
  }

  private normalizeToArray<T>(value: T[] | T): T[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'object' && value !== null) return [value];
    return [];
  }

  private toPositiveNumber(value: unknown): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return Math.max(0, value);
    }
    if (typeof value === 'string' && value.trim().length) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return Math.max(0, parsed);
    }
    return 0;
  }

  private cleanText(value: unknown, fallback: string): string {
    if (typeof value !== 'string') return fallback;
    const clean = value.trim();
    return clean.length ? clean : fallback;
  }

  private safeFormatDate(value: unknown): string {
    if (typeof value !== 'string' || !value.trim().length) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return this.formatDate(value);
  }

  private resolvePeriodLabel(fechaInicio: unknown, fechaFin: unknown): string {
    if (typeof fechaInicio !== 'string' || typeof fechaFin !== 'string') {
      return 'Plan activo';
    }

    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 'Plan activo';

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays > 31) return 'Plan anual activo';
    return 'Plan mensual activo';
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

  private resolveAvailablePlanPeriod(value: unknown): string {
    if (typeof value !== 'string') return 'Plan mensual';
    const normalized = value.trim().toLowerCase();

    if (normalized.startsWith('anual')) return 'Plan anual';
    if (normalized.startsWith('mensual')) return 'Plan mensual';

    const clean = value.trim();
    return clean.length ? clean : 'Plan mensual';
  }

  private resolvePeriodUnit(value: unknown): string {
    if (typeof value !== 'string') return 'mes';
    const normalized = value.trim().toLowerCase();
    if (normalized.startsWith('anual') || normalized.startsWith('anio')) return 'año';
    if (normalized.startsWith('trimes')) return 'trimestre';
    if (normalized.startsWith('seman')) return 'semana';
    return 'mes';
  }
}






