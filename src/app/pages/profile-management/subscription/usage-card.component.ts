import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface UsageMetric {
  key: string;
  label: string;
  used: number;
  limit: number;
  displayLimit?: number;
  helper: string;
  tone: 'brand' | 'emerald' | 'violet' | 'yellow' | 'red';
}

@Component({
  selector: 'app-usage-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usage-card.component.html',
})
export class UsageCardComponent {
  @Input({ required: true }) metrics: UsageMetric[] = [];
  @Input() summaryTopLabel = 'Actualizado hoy';
  @Input() summaryBottomLabel = '';

  getPercent(metric: UsageMetric): number {
    if (!metric.limit) {
      return 0;
    }
    const percent = (metric.used / metric.limit) * 100;
    if (metric.used > 0 && percent > 0 && percent < 1) {
      return 1;
    }
    return Math.min(100, Math.round(percent));
  }

  getDisplayLimit(metric: UsageMetric): number {
    return metric.displayLimit ?? metric.limit;
  }

  getProgressClasses(metric: UsageMetric): string {
    const base = 'h-2 rounded-full';
    switch (metric.tone) {
      case 'emerald':
        return `${base} bg-emerald-500 dark:bg-emerald-400`;
      case 'yellow':
        return `${base} bg-yellow-500 dark:bg-yellow-400`;
      case 'red':
        return `${base} bg-red-500 dark:bg-red-400`;
      case 'violet':
        return `${base} bg-violet-500 dark:bg-violet-400`;
      default:
        return `${base} bg-brand-500 dark:bg-brand-400`;
    }
  }
}
