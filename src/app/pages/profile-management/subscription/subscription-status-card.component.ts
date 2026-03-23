import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type SubscriptionStatus = 'activa' | 'por_vencer' | 'cancelada' | 'vencida';

export interface SubscriptionStatusSummary {
  status: SubscriptionStatus;
  statusLabel: string;
  renewalLabel: string;
  nextRenewalDate: string;
  costoLabel: string;
  stripeIdLabel: string;
}

@Component({
  selector: 'app-subscription-status-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-status-card.component.html',
})
export class SubscriptionStatusCardComponent {
  @Input({ required: true }) summary!: SubscriptionStatusSummary;

  get statusBadgeClasses(): string {
    const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold';
    switch (this.summary.status) {
      case 'activa':
        return `${base} bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400`;
      case 'por_vencer':
        return `${base} bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400`;
      case 'cancelada':
        return `${base} bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400`;
      default:
        return `${base} bg-gray-100 text-gray-700 dark:bg-white/[0.06] dark:text-white/80`;
    }
  }
}
