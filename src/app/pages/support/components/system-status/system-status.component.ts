import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProcessState, StatusService } from '../../data/status.data';

@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-status.component.html',
})
export class SystemStatusComponent {
  @Input() services: StatusService[] = [];
  @Input() processStates: ProcessState[] = [];

  getStatusClasses(status: StatusService['status']): string {
    const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold';
    switch (status) {
      case 'operational':
        return `${base} bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400`;
      case 'degraded':
        return `${base} bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400`;
      default:
        return `${base} bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400`;
    }
  }

  getProcessBadge(status: ProcessState['status']): string {
    const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold';
    switch (status) {
      case 'completed':
        return `${base} bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400`;
      case 'processing':
        return `${base} bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400`;
      case 'waiting':
        return `${base} bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400`;
      default:
        return `${base} bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400`;
    }
  }
}
