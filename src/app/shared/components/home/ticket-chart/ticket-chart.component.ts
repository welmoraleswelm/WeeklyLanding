import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexStroke, ApexYAxis, ApexGrid, ApexFill, ApexTooltip } from 'ng-apexcharts';
import { DashboardApiService, TicketsRange, TicketStatus } from '../../../../core/services/dashboard-api.service';

const DEFAULT_MONTH_CATEGORIES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const DEFAULT_MONTH_TOTALS = new Array(DEFAULT_MONTH_CATEGORIES.length).fill(0);

@Component({
  selector: 'app-ticket-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './ticket-chart.component.html'
})
export class TicketChartComponent implements OnInit {
  private readonly dashboardApiService = inject(DashboardApiService);

  activeRange: TicketsRange = 'mensual';
  activeStatus: TicketStatus = 'guardado';
  dateRangeLabel = '';

  public series: ApexAxisChartSeries = [
    {
      name: 'Tickets',
      data: [...DEFAULT_MONTH_TOTALS],
    },
  ];
  public chart: ApexChart = {
    fontFamily: 'Poppins, sans-serif',
    type: 'bar',
    height: 240,
    toolbar: { show: false },
  };
  public xaxis: ApexXAxis = {
    categories: [...DEFAULT_MONTH_CATEGORIES],
    axisBorder: { show: false },
    axisTicks: { show: false },
  };
  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    },
  };
  public dataLabels: ApexDataLabels = { enabled: false };
  public stroke: ApexStroke = {
    show: true,
    width: 4,
    colors: ['transparent'],
  };
  public yaxis: ApexYAxis = { title: { text: undefined } };
  public grid: ApexGrid = { yaxis: { lines: { show: true } } };
  public fill: ApexFill = { opacity: 1 };
  public tooltip: ApexTooltip = {
    x: { show: false },
    y: { formatter: (val: number) => `${val}` },
  };
  public colors: string[] = ['#465fff'];

  ngOnInit(): void {
    this.dateRangeLabel = buildTicketChartWindowLabel();
    this.loadTicketsByRange(this.activeRange, this.activeStatus);
  }

  setRange(range: TicketsRange): void {
    if (this.activeRange === range) return;
    this.activeRange = range;
    this.loadTicketsByRange(range, this.activeStatus);
  }

  isRangeActive(range: TicketsRange): boolean {
    return this.activeRange === range;
  }

  setStatus(status: TicketStatus): void {
    if (this.activeStatus === status) return;
    this.activeStatus = status;
    this.loadTicketsByRange(this.activeRange, status);
  }

  isStatusActive(status: TicketStatus): boolean {
    return this.activeStatus === status;
  }

  rangeButtonClass(range: TicketsRange): string {
    if (this.isRangeActive(range)) {
      return 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white';
    }
    return 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white';
  }

  statusButtonClass(status: TicketStatus): string {
    if (this.isStatusActive(status)) {
      return 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white';
    }
    return 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white';
  }

  get chartTitle(): string {
    if (this.activeRange === 'trimestral') return 'Tickets trimestrales';
    if (this.activeRange === 'anual') return 'Tickets anuales';
    return 'Tickets mensuales';
  }

  private loadTicketsByRange(range: TicketsRange, status: TicketStatus): void {
    this.dashboardApiService.getTicketsByRange(range, status).subscribe((result) => {
      this.series = [
        {
          name: 'Tickets',
          data: result.totals,
        },
      ];

      this.xaxis = {
        ...this.xaxis,
        categories: result.categories,
      };
    });
  }
}

function buildTicketChartWindowLabel(): string {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return `${formatShortDateEs(start)} - ${formatShortDateEs(end)}`;
}

function formatShortDateEs(date: Date): string {
  const short = new Intl.DateTimeFormat('es-MX', {
    month: 'short',
    day: 'numeric',
  }).format(date);

  const normalized = short.replace('.', '');
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

