import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  DashboardApiService,
  RecentErrorItem,
} from '../../../../core/services/dashboard-api.service';

@Component({
  selector: 'app-recent-errors',
  imports: [CommonModule],
  templateUrl: './recent-errors.component.html'
})
export class RecentErrorsComponent implements OnInit {
  private readonly dashboardApiService = inject(DashboardApiService);

  errors: RecentErrorItem[] = [];

  get alertCountLabel(): string {
    const count = this.errors.length;
    return `${count} alerta${count === 1 ? '' : 's'}`;
  }

  ngOnInit(): void {
    this.dashboardApiService.getRecentErrors(20).subscribe((result) => {
      this.errors = result.items;
    });
  }
}

