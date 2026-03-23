import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, forkJoin, map, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiClientService } from '../../../core/http/api-client.service';
import { ApiRequestContextService } from '../../../core/http/api-request-context.service';
import { SubscriptionUiSyncService } from '../../../core/services/subscription-ui-sync.service';

type AvailablePlanDto = {
  idPlanDTO?: number | string;
  nombrePlanDTO?: string;
  costoPlanDTO?: number | string;
  planVinculadoUsuarioDTO?: boolean | number | string;
  beneficiosDTO?: unknown;
};

type SubscriptionSummaryDto = {
  idNivelDTO?: number | string;
};

@Component({
  selector: 'app-sidebar-widget',
  standalone: true,
  template: `
    @if (widgetReady && showUpgradeWidget) {
    <div
      class="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]"
    >
      <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
        Optimiza tu plan
      </h3>
      <p class="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Revisa tus planes disponibles, compara beneficios y ajusta tu suscripcion segun el volumen de tickets y facturacion de tu operacion.
      </p>
      <button
        type="button"
        (click)="goToPlans()"
        class="flex w-full items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Planes
      </button>
    </div>
    }
  `
})
export class SidebarWidgetComponent implements OnDestroy {
  private readonly api = inject(ApiClientService);
  private readonly requestContext = inject(ApiRequestContextService);
  private readonly router = inject(Router);
  private readonly subscriptionUiSync = inject(SubscriptionUiSyncService);
  private readonly subscription = new Subscription();

  widgetReady = false;
  showUpgradeWidget = false;

  constructor() {
    this.loadUpgradeWidgetVisibility();

    this.subscription.add(
      this.subscriptionUiSync.planChanged$.subscribe(() => {
        this.loadUpgradeWidgetVisibility();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToPlans(): void {
    void this.router.navigate(['/wallet'], {
      fragment: 'wallet-plans',
      queryParams: { highlight: 'subscription-card' },
    });
  }

  private loadUpgradeWidgetVisibility(): void {
    const userId = this.requestContext.getUserIdOrDefault();

    forkJoin({
      summary: this.api
        .post<SubscriptionSummaryDto[] | SubscriptionSummaryDto>(
          API_ENDPOINTS.wallet.subscriptionSummary,
          { idUsuario: userId }
        )
        .pipe(
          map((response) => this.normalizeToArray(response)),
          catchError(() => of([] as SubscriptionSummaryDto[]))
        ),
      plans: this.api
        .post<AvailablePlanDto[] | AvailablePlanDto>(
          API_ENDPOINTS.wallet.plans,
          { idUsuario: userId }
        )
        .pipe(
          map((response) => this.normalizeToArray(response)),
          catchError(() => of([] as AvailablePlanDto[]))
        ),
    }).subscribe(({ summary, plans }) => {
        const currentLevel = this.toNumber(summary[0]?.idNivelDTO);

        if (currentLevel !== null) {
          // Mostrar solo si existe al menos un plan distinto al actual.
          this.showUpgradeWidget = plans.some(
            (plan) => {
              const planId = this.toNumber(plan.idPlanDTO);
              return planId !== null && planId !== currentLevel;
            }
          );
        } else {
          this.showUpgradeWidget = plans.length > 0;
        }

        this.widgetReady = true;
      });
  }

  private toNumber(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return null;
  }

  private normalizeToArray<T>(value: T[] | T): T[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'object' && value !== null) return [value];
    return [];
  }
}
