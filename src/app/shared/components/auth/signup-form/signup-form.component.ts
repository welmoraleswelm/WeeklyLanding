import { Component, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';


@Component({
  selector: 'app-signup-form',
  imports: [
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule
],
  templateUrl: './signup-form.component.html',
  styles: `:host { display: block; width: 100%; max-width: 520px; }`
})
export class SignupFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  showPassword = false;
  isChecked = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  fname = '';
  lname = '';
  email = '';
  password = '';
  confirmPassword = '';
  telefono = '';
  notificacionesActivas = true;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignUp() {
    if (!this.fname.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim() || this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contrasenas no coinciden.';
      return;
    }

    this.isLoading = true;

    this.authService
      .signUp({
        firstName: this.fname.trim(),
        lastName: this.lname.trim(),
        email: this.email.trim(),
        password: this.password,
        acceptTerms: this.isChecked,
        telefono: this.telefono.trim() || undefined,
        notificacionesActivas: this.notificacionesActivas,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.successMessage = result.message;
          void this.router.navigateByUrl('/signin');
        },
        error: (error: unknown) => {
          this.errorMessage = getErrorMessage(error);
        },
      });
  }
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as { error?: unknown }).error === 'object'
  ) {
    const errorPayload = (error as { error?: Record<string, unknown> }).error;
    if (errorPayload && typeof errorPayload['message'] === 'string') {
      return errorPayload['message'];
    }
    if (errorPayload && typeof errorPayload['mensaje'] === 'string') {
      return errorPayload['mensaje'];
    }
  }
  return 'No se pudo completar el registro.';
}
