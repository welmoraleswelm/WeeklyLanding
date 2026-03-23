import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactSupportFormComponent } from '../contact-support-form/contact-support-form.component';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ContactSupportFormComponent],
  templateUrl: './contact-modal.component.html',
})
export class ContactModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
