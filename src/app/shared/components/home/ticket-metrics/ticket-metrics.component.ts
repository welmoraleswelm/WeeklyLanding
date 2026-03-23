import { Component, OnInit, inject } from '@angular/core';
import { DashboardApiService } from '../../../../core/services/dashboard-api.service';

@Component({
  selector: 'app-ticket-metrics',
  imports: [],
  templateUrl: './ticket-metrics.component.html'
})
export class TicketMetricsComponent implements OnInit {
  private readonly dashboardApiService = inject(DashboardApiService);

  guardados = 0;
  pendientes = 0;
  cancelados = 0;
  facturados = 0;
  totalFacturado = 0;
  dateRangeLabel = '';

  get totalFacturadoFormatted(): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.totalFacturado);
  }

  ngOnInit(): void {
    this.dateRangeLabel = buildTicketWindowLabel();

    this.dashboardApiService.getTicketConsumption().subscribe((result) => {
      this.guardados = result.summary.guardados;
      this.pendientes = result.summary.pendientes;
      this.cancelados = result.summary.cancelados;
      this.facturados = result.summary.facturados;
      this.totalFacturado = result.summary.totalFacturado;
    });
  }
}

function buildTicketWindowLabel(): string {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return `${formatDateEsMx(start)} - ${formatDateEsMx(end)}`;
}

function formatDateEsMx(date: Date): string {
  const value = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  return value.charAt(0).toUpperCase() + value.slice(1);
}
