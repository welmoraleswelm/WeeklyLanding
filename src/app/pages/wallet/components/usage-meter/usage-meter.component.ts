import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UsageItem } from '../../data/wallet.models';

@Component({
  selector: 'app-usage-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usage-meter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageMeterComponent {
  @Input() usage: UsageItem[] = [];

  getPercent(item: UsageItem): number {
    if (!item.limit) {
      return 0;
    }
    return Math.min(100, Math.round((item.used / item.limit) * 100));
  }

  getProgressWidth(item: UsageItem): string {
    const percent = this.getPercent(item);
    return `${percent}%`;
  }

  getToneClass(item: UsageItem): string {
    switch (item.tone) {
      case 'emerald':
        return 'bg-emerald-500';
      case 'amber':
        return 'bg-amber-500';
      default:
        return 'bg-brand-500';
    }
  }

  isWarning(item: UsageItem): boolean {
    return item.limit ? item.used / item.limit >= 0.8 : false;
  }
}
