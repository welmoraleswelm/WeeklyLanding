import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: 'ticket' | 'portal' | 'billing' | 'security' | 'api' | 'download';
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  @Input() actions: QuickAction[] = [];
}
