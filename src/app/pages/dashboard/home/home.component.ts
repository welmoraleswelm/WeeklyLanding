import { Component } from '@angular/core';
import { TicketMetricsComponent } from '../../../shared/components/home/ticket-metrics/ticket-metrics.component';
import { TicketChartComponent } from '../../../shared/components/home/ticket-chart/ticket-chart.component';
import { ActualPlanComponent } from '../../../shared/components/home/actual-plan/actual-plan.component';
import { BillingMetricsComponent } from '../../../shared/components/home/billing-metrics/billing-metrics.component';
import { RecentTicketsComponent } from '../../../shared/components/home/recent-tickets/recent-tickets.component';
import { TopCompaniesComponent } from '../../../shared/components/home/top-companies/top-companies.component';
import { RecentErrorsComponent } from '../../../shared/components/home/recent-errors/recent-errors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TicketMetricsComponent,
    TicketChartComponent,
    ActualPlanComponent,
    BillingMetricsComponent,
    RecentTicketsComponent,
    TopCompaniesComponent,
    RecentErrorsComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
