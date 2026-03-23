import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BillingStatus = 'pagado' | 'en_proceso' | 'fallido';

export interface BillingHistoryItem {
  id: string;
  fecha: string;
  concepto: string;
  monto: string;
  status: BillingStatus;
  hasReceipt: boolean;
}

@Component({
  selector: 'app-billing-history-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing-history-table.component.html',
})
export class BillingHistoryTableComponent {
  @Input() items: BillingHistoryItem[] = [];
  @Input() loading = false;
  @Output() download = new EventEmitter<BillingHistoryItem>();

  onDownload(item: BillingHistoryItem): void {
    if (!item.hasReceipt) {
      return;
    }
    this.download.emit(item);
  }

  getStatusClasses(status: BillingStatus): string {
    const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold';
    switch (status) {
      case 'pagado':
        return `${base} bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400`;
      case 'en_proceso':
        return `${base} bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400`;
      default:
        return `${base} bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400`;
    }
  }

  getStatusLabel(status: BillingStatus): string {
    if (status === 'pagado') return 'Pagado';
    if (status === 'en_proceso') return 'En proceso';
    return 'Fallido';
  }
}
