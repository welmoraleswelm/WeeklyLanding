import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import * as QRCode from 'qrcode';
import { AuthService } from '../../core/auth/auth.service';
import { MfaSetup } from '../../core/auth/auth.models';
import { ApiRequestContextService } from '../../core/http/api-request-context.service';
import { WalletApiService } from './services/wallet-api.service';
import { AddCardModalComponent } from './components/add-card-modal/add-card-modal.component';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { SecurityPanelComponent } from './components/security-panel/security-panel.component';
import { SubscriptionManagementComponent } from './components/subscription-management/subscription-management.component';
import { HeaderSummaryComponent } from './components/header-summary/header-summary.component';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { PlanOption } from './data/wallet.models';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    HeaderSummaryComponent,
    SubscriptionManagementComponent,
    PaymentMethodsComponent,
    InvoicesTableComponent,
    SecurityPanelComponent,
    AddCardModalComponent,
  ],
  templateUrl: './wallet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent {
  private authService = inject(AuthService);
  private requestContext = inject(ApiRequestContextService);
  private walletService = inject(WalletApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private clearHighlightTimeout: ReturnType<typeof setTimeout> | null = null;
  private pendingPaymentMethodsFocus = false;
  private pendingSubscriptionFocus = false;
  private paymentMethodsSectionRef?: HTMLElement;
  private subscriptionSectionRef?: HTMLElement;
  private currentPlans: PlanOption[] = [];

  readonly plan$ = this.walletService.plan$;
  readonly cards$ = this.walletService.cards$;
  readonly invoices$ = this.walletService.invoices$;
  readonly security$ = this.walletService.security$;
  readonly plans$ = this.walletService.plans$;
  readonly message$ = this.walletService.message$;

  isAddCardOpen = false;
  isCancelPlanModalOpen = false;
  isChangePlanModalOpen = false;
  highlightPaymentMethods = false;
  highlightSubscription = false;
  selectedPlanToChange: PlanOption | null = null;
  isMfaModalOpen = false;
  isMfaLoading = false;
  mfaSetup: MfaSetup | null = null;
  mfaQrCodeDataUrl = '';
  mfaCode = '';
  mfaModalError = '';
  mfaModalInfo = '';

  @ViewChild('paymentMethodsSection')
  set paymentMethodsSection(element: ElementRef<HTMLElement> | undefined) {
    this.paymentMethodsSectionRef = element?.nativeElement;
    if (!this.paymentMethodsSectionRef || !this.pendingPaymentMethodsFocus) return;
    this.focusPaymentMethodsSection(this.paymentMethodsSectionRef);
  }

  @ViewChild('subscriptionSection')
  set subscriptionSection(element: ElementRef<HTMLElement> | undefined) {
    this.subscriptionSectionRef = element?.nativeElement;
    if (!this.subscriptionSectionRef || !this.pendingSubscriptionFocus) return;
    this.focusSubscriptionSection(this.subscriptionSectionRef);
  }

  constructor() {
    this.walletService.refreshWallet();

    this.plans$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((plans) => {
        this.currentPlans = plans;
      });

    combineLatest([this.route.queryParamMap, this.route.fragment]).subscribe(([params, fragment]) => {
      const highlight = params.get('highlight');
      this.pendingPaymentMethodsFocus = highlight === 'payment-methods';
      this.pendingSubscriptionFocus =
        highlight === 'subscription-card' || fragment === 'wallet-plans';
      this.cdr.markForCheck();

      if (this.pendingPaymentMethodsFocus && this.paymentMethodsSectionRef) {
        this.focusPaymentMethodsSection(this.paymentMethodsSectionRef);
      }

      if (this.pendingSubscriptionFocus && this.subscriptionSectionRef) {
        this.focusSubscriptionSection(this.subscriptionSectionRef);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.clearHighlightTimeout) {
      clearTimeout(this.clearHighlightTimeout);
    }
  }

  openAddCard(): void {
    this.isAddCardOpen = true;
  }

  closeAddCard(): void {
    this.isAddCardOpen = false;
  }

  handleCardSaved(): void {
    this.closeAddCard();
  }

  makeDefault(cardId: string): void {
    this.walletService.setDefaultCard(cardId);
  }

  removeCard(cardId: string): void {
    this.walletService.removeCard(cardId);
  }

  hasDefaultCard(cards: { isDefault: boolean }[]): boolean {
    return cards.some((card) => card.isDefault);
  }

  retryPayment(): void {
    this.walletService.retryPayment();
  }

  updateCard(): void {
    this.openAddCard();
  }

  cancelPlan(): void {
    this.isCancelPlanModalOpen = true;
    this.cdr.markForCheck();
  }

  closeCancelPlanModal(): void {
    this.isCancelPlanModalOpen = false;
    this.cdr.markForCheck();
  }

  confirmCancelPlan(): void {
    this.isCancelPlanModalOpen = false;
    this.walletService.cancelPlan();
    this.cdr.markForCheck();
  }

  changePlan(planId: string): void {
    const selectedPlan = this.currentPlans.find((plan) => plan.id === planId && !plan.isCurrent);
    if (!selectedPlan) {
      return;
    }

    this.selectedPlanToChange = selectedPlan;
    this.isChangePlanModalOpen = true;
    this.cdr.markForCheck();
  }

  closeChangePlanModal(): void {
    this.isChangePlanModalOpen = false;
    this.selectedPlanToChange = null;
    this.cdr.markForCheck();
  }

  confirmChangePlan(): void {
    if (!this.selectedPlanToChange) {
      return;
    }

    const planId = this.selectedPlanToChange.id;
    this.isChangePlanModalOpen = false;
    this.selectedPlanToChange = null;
    this.walletService.changePlan(planId);
    this.cdr.markForCheck();
  }

  toggleAutoRenew(enabled: boolean): void {
    this.walletService.updateAutoRenew(enabled);
  }

  clearMessage(): void {
    this.walletService.clearMessage();
  }

  openMfaModal(): void {
    this.isMfaModalOpen = true;
    this.mfaModalError = '';
    this.mfaModalInfo = '';

    const userId = this.requestContext.getUserIdOrNull();
    if (userId === null) {
      this.mfaSetup = null;
      this.mfaModalError = 'No se pudo identificar tu cuenta. Vuelve a iniciar sesion.';
      this.cdr.markForCheck();
      return;
    }

    if (this.walletService.getSecuritySnapshot().mfaEnabled) {
      this.mfaSetup = null;
      this.mfaModalInfo = 'El MFA ya esta activado para esta cuenta.';
      this.cdr.markForCheck();
      return;
    }

    this.isMfaLoading = true;
    this.mfaSetup = null;
    this.mfaQrCodeDataUrl = '';
    this.cdr.markForCheck();

    this.authService
      .startMfaSetup({ idUsuario: userId })
      .subscribe({
        next: async (setup) => {
          this.mfaSetup = setup;
          this.mfaQrCodeDataUrl = await this.buildMfaQrCode(setup.otpAuthUri);
          this.isMfaLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isMfaLoading = false;
          this.mfaModalError = 'No se pudo iniciar la activacion MFA.';
          this.cdr.markForCheck();
        },
      });
  }

  closeMfaModal(): void {
    this.isMfaModalOpen = false;
    this.isMfaLoading = false;
    this.mfaSetup = null;
    this.mfaQrCodeDataUrl = '';
    this.mfaCode = '';
    this.mfaModalError = '';
    this.mfaModalInfo = '';
    this.cdr.markForCheck();
  }

  updateMfaCode(value: string): void {
    this.mfaCode = (value ?? '').replace(/\D/g, '').slice(0, 6);
  }

  confirmMfaActivation(): void {
    if (!this.mfaSetup || !this.mfaCode.trim() || this.isMfaLoading) {
      return;
    }

    this.isMfaLoading = true;
    this.mfaModalError = '';
    this.cdr.markForCheck();

    this.authService
      .confirmMfaSetup({
        idUsuario: this.mfaSetup.userId,
        setupToken: this.mfaSetup.setupToken,
        codigo: this.mfaCode.trim(),
      })
      .subscribe({
        next: () => {
          this.isMfaLoading = false;
          this.walletService.refreshSecurity();
          this.mfaModalInfo = 'MFA activado correctamente.';
          this.mfaSetup = null;
          this.mfaQrCodeDataUrl = '';
          this.mfaCode = '';
          this.cdr.markForCheck();
        },
        error: () => {
          this.isMfaLoading = false;
          this.mfaModalError = 'No se pudo confirmar el codigo MFA.';
          this.cdr.markForCheck();
        },
      });
  }

  private focusPaymentMethodsSection(element: HTMLElement): void {
    this.pendingPaymentMethodsFocus = false;
    this.highlightPaymentMethods = true;
    this.cdr.markForCheck();

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (this.clearHighlightTimeout) {
      clearTimeout(this.clearHighlightTimeout);
    }

    this.clearHighlightTimeout = setTimeout(() => {
      this.highlightPaymentMethods = false;
      this.cdr.markForCheck();
    }, 5000);

    this.clearHighlightQueryParam();
  }

  private focusSubscriptionSection(element: HTMLElement): void {
    this.pendingSubscriptionFocus = false;
    this.highlightSubscription = true;
    this.cdr.markForCheck();

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (this.clearHighlightTimeout) {
      clearTimeout(this.clearHighlightTimeout);
    }

    this.clearHighlightTimeout = setTimeout(() => {
      this.highlightSubscription = false;
      this.cdr.markForCheck();
    }, 5000);

    this.clearHighlightQueryParam();
  }

  private clearHighlightQueryParam(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { highlight: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private async buildMfaQrCode(otpAuthUri: string): Promise<string> {
    if (!otpAuthUri.trim()) {
      return '';
    }

    try {
      return await QRCode.toDataURL(otpAuthUri, {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 220,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
    } catch {
      return '';
    }
  }
}
