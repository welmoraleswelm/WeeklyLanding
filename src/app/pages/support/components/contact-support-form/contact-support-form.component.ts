import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-support-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-support-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSupportFormComponent {
  private readonly fb = inject(FormBuilder);

  isSubmitting = false;
  submitted = false;
  showSuccess = false;

  readonly categories = [
    'Procesamiento de tickets',
    'Facturación / CFDI',
    'Planes y pagos',
    'Seguridad y acceso',
    'Otro',
  ];

  readonly priorities = ['Baja', 'Media', 'Alta'];

  form = this.fb.group({
    category: ['', Validators.required],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    ticketId: [''],
    priority: ['Media', Validators.required],
    attachments: [''],
    email: ['', Validators.email],
    acceptPolicies: [false, Validators.requiredTrue],
  });

  submit(): void {
    this.submitted = true;

    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.showSuccess = false;

    setTimeout(() => {
      this.isSubmitting = false;
      this.form.reset({
        priority: 'Media',
        acceptPolicies: false,
      });
      this.submitted = false;
      this.showSuccess = true;
    }, 1000);
  }
}
