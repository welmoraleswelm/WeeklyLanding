import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickActionItem } from '../../services/support-data.service';

@Component({
  selector: 'app-quick-actions-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsCardComponent {
  @Input() actions: QuickActionItem[] = [];
  @Input() isUploadBusy = false;
  @Input() uploadPhaseLabel = 'Extrayendo...';
  @Output() actionClick = new EventEmitter<QuickActionItem>();

  onActionClick(action: QuickActionItem): void {
    if (this.isUploadBusy && this.isUploadAction(action)) {
      return;
    }
    this.actionClick.emit(action);
  }

  isUploadAction(action: QuickActionItem): boolean {
    return action.id === 'qa-new' || action.icon === 'upload';
  }

  get uploadBusyLabel(): string {
    return this.uploadPhaseLabel?.trim() || 'Extrayendo...';
  }

  getIconColor(icon: string): string {
    switch (icon) {
      case 'upload':
        return 'from-brand-500 to-brand-600 text-white';
      case 'retry':
        return 'from-amber-500 to-orange-500 text-white';
      case 'download':
        return 'from-emerald-500 to-teal-500 text-white';
      default:
        return 'from-gray-500 to-gray-600 text-white';
    }
  }

  getHoverColor(icon: string): string {
    switch (icon) {
      case 'upload':
        return 'hover:border-brand-200 hover:bg-brand-50/50 dark:hover:border-brand-500/30 dark:hover:bg-brand-500/5';
      case 'retry':
        return 'hover:border-amber-200 hover:bg-amber-50/50 dark:hover:border-amber-500/30 dark:hover:bg-amber-500/5';
      case 'download':
        return 'hover:border-emerald-200 hover:bg-emerald-50/50 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/5';
      default:
        return 'hover:border-gray-300 hover:bg-gray-100/50 dark:hover:border-gray-600 dark:hover:bg-gray-500/5';
    }
  }
}
