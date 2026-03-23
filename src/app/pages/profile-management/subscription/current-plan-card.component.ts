import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';

export interface PlanUsageSummary {
  planName: string;
  periodoLabel: string;
  fechaInicio: string;
  fechaFin: string;
  costoLabel: string;
  consumoPorcentaje: number;
  consumoLabel: string;
  diasRestantesLabel: string;
  renovacionLabel: string;
}

@Component({
  selector: 'app-current-plan-card',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './current-plan-card.component.html',
})
export class CurrentPlanCardComponent {
  @Input({ required: true }) summary!: PlanUsageSummary;

  private readonly chartHeight = 220;

  public chart: ApexChart = {
    fontFamily: 'Poppins, sans-serif',
    type: 'radialBar',
    height: this.chartHeight,
    sparkline: { enabled: true },
  };

  public plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '75%' },
      track: {
        background: '#E5E7EB',
        strokeWidth: '55%',
        margin: 6,
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

  public labels: string[] = ['Uso'];
  public colors: string[] = ['#465FFF'];

  get series(): ApexNonAxisChartSeries {
    return [this.summary?.consumoPorcentaje ?? 0];
  }
}

