import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceItem, InvoiceStatus } from '../../data/wallet.models';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesTableComponent {
  @Input() invoices: InvoiceItem[] = [];

  statusFilter = 'all';
  monthFilter = 'all';

  readonly statusOptions: SelectOption[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Pagado', value: 'paid' },
    { label: 'Fallido', value: 'failed' },
    { label: 'Reembolsado', value: 'refunded' },
  ];

  readonly monthOptions: SelectOption[] = [
    { label: 'Todos los meses', value: 'all' },
    { label: 'Ene', value: 'ene' },
    { label: 'Feb', value: 'feb' },
    { label: 'Mar', value: 'mar' },
    { label: 'Abr', value: 'abr' },
    { label: 'May', value: 'may' },
    { label: 'Jun', value: 'jun' },
    { label: 'Jul', value: 'jul' },
    { label: 'Ago', value: 'ago' },
    { label: 'Sep', value: 'sep' },
    { label: 'Oct', value: 'oct' },
    { label: 'Nov', value: 'nov' },
    { label: 'Dic', value: 'dic' },
  ];

  get filteredInvoices(): InvoiceItem[] {
    return this.invoices.filter((invoice) => {
      const statusMatch = this.statusFilter === 'all' || invoice.status === this.statusFilter;
      const monthMatch =
        this.monthFilter === 'all' || invoice.date.toLowerCase().includes(this.monthFilter);
      return statusMatch && monthMatch;
    });
  }

  getStatusBadge(status: InvoiceStatus): string {
    switch (status) {
      case 'failed':
        return 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300';
      case 'refunded':
        return 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300';
      default:
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
    }
  }

  getStatusLabel(status: InvoiceStatus): string {
    switch (status) {
      case 'failed':
        return 'Fallido';
      case 'refunded':
        return 'Reembolsado';
      default:
        return 'Pagado';
    }
  }

  downloadInvoice(invoice: InvoiceItem): void {
    if (invoice.receiptUrl) {
      window.open(invoice.receiptUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const content = `Recibo ${invoice.id}\n${invoice.concept}\n${invoice.amount}\n${invoice.date}\nEstado: ${this.getStatusLabel(invoice.status)}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recibo-${invoice.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }
}


