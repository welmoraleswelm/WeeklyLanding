import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SecurityInfo } from '../../data/wallet.models';

@Component({
  selector: 'app-security-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityPanelComponent {
  @Input() security?: SecurityInfo;
  @Output() manage = new EventEmitter<void>();

  getStatusLabel(): string {
    return this.security?.mfaEnabled ? 'Activado' : 'Desactivado';
  }

  getStatusClass(): string {
    return this.security?.mfaEnabled
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/20'
      : 'bg-yellow-50 text-yellow-700 ring-yellow-100 dark:bg-yellow-500/15 dark:text-yellow-300 dark:ring-yellow-500/20';
  }

  onManage(): void {
    this.manage.emit();
  }
}
