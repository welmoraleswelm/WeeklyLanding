import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanInfo, PlanOption } from '../../data/wallet.models';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionManagementComponent {
  @Input({ required: true }) plan!: PlanInfo;
  @Input() plans: PlanOption[] = [];
  @Output() changePlan = new EventEmitter<string>();
  @Output() retryPayment = new EventEmitter<void>();
  @Output() updateCard = new EventEmitter<void>();
  @Output() cancelPlan = new EventEmitter<void>();

  onSelectPlan(planId: string): void {
    this.changePlan.emit(planId);
  }

  onRetryPayment(): void {
    this.retryPayment.emit();
  }

  onUpdateCard(): void {
    this.updateCard.emit();
  }

  onCancelPlan(): void {
    this.cancelPlan.emit();
  }

  getStatusLabel(): string {
    switch (this.plan.status) {
      case 'payment_failed':
        return 'Pago fallido';
      case 'paused':
        return 'En pausa';
      case 'free':
        return 'Gratis';
      default:
        return 'Activa';
    }
  }

  isPaymentFailed(): boolean {
    return this.plan.status === 'payment_failed';
  }

  isFree(): boolean {
    return this.plan.status === 'free';
  }

  hasPaidPlan(): boolean {
    return this.plan.status !== 'free';
  }

  getStatusBadge(): string {
    switch (this.plan.status) {
      case 'payment_failed':
        return 'bg-red-50 text-red-600 ring-red-100 dark:bg-red-500/15 dark:text-red-400 dark:ring-red-500/20';
      case 'paused':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-100 dark:bg-yellow-500/15 dark:text-yellow-400 dark:ring-yellow-500/20';
      case 'free':
        return 'bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-400 dark:ring-blue-500/20';
      default:
        return 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20';
    }
  }
}
