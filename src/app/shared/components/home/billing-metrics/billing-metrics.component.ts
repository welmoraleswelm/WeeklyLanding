import { Component, OnInit, inject } from '@angular/core';
import {
  BillingMetricsApiService,
  InvoicePreparationSummary,
} from './billing-metrics-api.service';

@Component({
  selector: 'app-billing-metrics',
  imports: [],
  templateUrl: './billing-metrics.component.html',
})
export class BillingMetricsComponent implements OnInit {
  private readonly billingMetricsApi = inject(BillingMetricsApiService);

  metrics: InvoicePreparationSummary = {
    ticketsAnalyzed: 0,
    ticketsReady: 0,
    ticketsPending: 0,
    preparationPercent: 0,
    ticketsProcessed: 0,
    savedMinutes: 0,
    minutesPerTicket: 6,
  };

  ngOnInit(): void {
    this.billingMetricsApi.getSummary().subscribe((summary) => {
      this.metrics = summary;
    });
  }

  get donutOffset(): number {
    const circumference = 201;
    return circumference - (circumference * this.metrics.preparationPercent) / 100;
  }

  get savedMinutes(): number {
    return this.metrics.savedMinutes;
  }

  get savedTimeLabel(): string {
    const totalMinutes = this.savedMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours <= 0) return `${minutes} min`;
    if (minutes <= 0) return `${hours} h`;

    return `${hours} h ${minutes} m`;
  }

  get savingsBadge(): string {
    return `~${this.metrics.minutesPerTicket} min/ticket`;
  }
}
