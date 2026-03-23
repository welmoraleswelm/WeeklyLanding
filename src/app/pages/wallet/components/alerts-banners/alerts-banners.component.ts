import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertItem } from '../../data/wallet.models';

@Component({
  selector: 'app-alerts-banners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-banners.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsBannersComponent {
  @Input() alerts: AlertItem[] = [];
  @Output() dismiss = new EventEmitter<string>();
  @Output() action = new EventEmitter<AlertItem>();

  onDismiss(id: string): void {
    this.dismiss.emit(id);
  }

  onAction(alert: AlertItem): void {
    this.action.emit(alert);
  }

  getBannerClasses(type: AlertItem['type']): string {
    const base = 'rounded-3xl border p-5 text-sm';
    switch (type) {
      case 'payment_failed':
        return `${base} border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-300`;
      case 'card_expiring':
        return `${base} border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300`;
      default:
        return `${base} border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300`;
    }
  }
}
