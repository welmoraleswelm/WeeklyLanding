import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-subscription-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-subscription-modal.component.html',
})
export class CancelSubscriptionModalComponent {
  @Input() open = false;
  @Input() planName = '';
  @Input() endDateLabel = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
