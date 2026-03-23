import { Component, OnInit, inject } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {
  DashboardApiService,
  PlanUsuarioDto,
} from '../../../../core/services/dashboard-api.service';

@Component({
  selector: 'app-actual-plan',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './actual-plan.component.html',
})
export class ActualPlanComponent implements OnInit {
  private readonly dashboardApiService = inject(DashboardApiService);

  planName = '-';
  used = 0;
  limit = 0;
  remainingDays = 0;
  projectedUsed = 0;
  apiSource: 'api' | 'fallback' = 'fallback';
  apiRows: PlanUsuarioDto[] = [];

  public series: ApexNonAxisChartSeries = [0];
  public chart: ApexChart = {
    fontFamily: 'Poppins, sans-serif',
    type: 'radialBar',
    height: 350,
    sparkline: { enabled: true },
  };
  public plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '80%' },
      track: {
        background: '#E4E7EC',
        strokeWidth: '50%',
        margin: 5,
      },
      dataLabels: {
        name: { show: false },
        value: { show: false },
      },
    },
  };
  public fill: ApexFill = {
    type: 'solid',
    colors: ['#465FFF'],
  };
  public stroke: ApexStroke = {
    lineCap: 'round',
  };
  public labels: string[] = ['Progress'];
  public colors: string[] = ['#465FFF'];

  get usagePercent(): number {
    if (!this.limit) return 0;
    return Math.min(100, Math.max(0, Math.round((this.used / this.limit) * 100)));
  }

  get projectionPercent(): number {
    if (!this.limit) return 0;
    return Math.min(100, Math.max(0, Math.round((this.projectedUsed / this.limit) * 100)));
  }

  get showUpgradeRecommendation(): boolean {
    return this.limit > 0 && this.projectedUsed > this.limit;
  }

  ngOnInit(): void {
    this.dashboardApiService.getPlanConsumption().subscribe((result) => {
      this.planName = result.summary.planName;
      this.used = result.summary.used;
      this.limit = result.summary.limit;
      this.remainingDays = result.summary.remainingDays;
      this.projectedUsed = result.summary.projectedUsed;
      this.apiRows = result.rawData;
      this.apiSource = result.source;
      this.series = [this.usagePercent];
    });
  }
}


