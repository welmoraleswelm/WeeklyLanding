import { Component, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { MfaChallenge } from '../../../../core/auth/auth.models';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './signin-form.component.html',
  styles: `:host { display: block; width: 100%; max-width: 420px; }`
})
export class SigninFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  showPassword = false;
  isChecked = false;
  isLoading = false;
  errorMessage = '';
  infoMessage = '';

  email = '';
  password = '';
  mfaCode = '';
  pendingMfaChallenge: MfaChallenge | null = null;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updateMfaCode(value: string): void {
    this.mfaCode = (value ?? '').replace(/\D/g, '').slice(0, 6);
  }

  onSignIn() {
    if (this.pendingMfaChallenge) {
      this.onVerifyMfa();
      return;
    }

    if (!this.email.trim() || !this.password.trim() || this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.infoMessage = '';
    this.isLoading = true;

    this.authService
      .signIn({
        email: this.email.trim(),
        password: this.password,
        rememberMe: this.isChecked,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          if (result.requiresMfa) {
            this.pendingMfaChallenge = result;
            this.infoMessage = 'Ingresa el codigo de 6 digitos de tu app autenticadora para completar el acceso.';
            return;
          }

          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: unknown) => {
          this.errorMessage = getErrorMessage(error);
        },
      });
  }

  onVerifyMfa() {
    if (!this.pendingMfaChallenge || !this.mfaCode.trim() || this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.infoMessage = '';
    this.isLoading = true;

    this.authService
      .verifyMfa(
        {
          challengeToken: this.pendingMfaChallenge.challengeToken,
          codigo: this.mfaCode.trim(),
        },
        this.email.trim()
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.pendingMfaChallenge = null;
          this.mfaCode = '';
          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: unknown) => {
          this.errorMessage = getErrorMessage(error);
        },
      });
  }

  resetMfaStep(): void {
    this.pendingMfaChallenge = null;
    this.mfaCode = '';
    this.infoMessage = '';
    this.errorMessage = '';
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
  return 'No se pudo iniciar sesión. Verifica tus credenciales.';
}
