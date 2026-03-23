import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  DashboardApiService,
  TopCompanyItem,
} from '../../../../core/services/dashboard-api.service';

@Component({
  selector: 'app-top-companies',
  imports: [CommonModule],
  templateUrl: './top-companies.component.html',
})
export class TopCompaniesComponent implements OnInit {
  private readonly dashboardApiService = inject(DashboardApiService);

  companies: TopCompanyItem[] = [];

  ngOnInit(): void {
    this.dashboardApiService.getTopCompanies().subscribe((result) => {
      this.companies = result.items;
    });
  }

  formatAmount(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  formatTickets(value: number): string {
    return `${value} ticket${value === 1 ? '' : 's'}`;
  }
}
