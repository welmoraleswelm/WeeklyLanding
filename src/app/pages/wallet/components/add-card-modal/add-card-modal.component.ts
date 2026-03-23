import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeCardElementChangeEvent,
  StripeElements,
} from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { TicketUploadStatusService, UploadNotificationSnapshot } from '../../../ticket-management/services/ticket-upload-status.service';
import { WalletApiService } from '../../services/wallet-api.service';

@Component({
  selector: 'app-add-card-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-card-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardModalComponent implements OnChanges, AfterViewChecked, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly walletService = inject(WalletApiService);
  private readonly notificationService = inject(TicketUploadStatusService);

  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  @ViewChild('cardElementHost') private cardElementHost?: ElementRef<HTMLDivElement>;

  isSaving = false;
  isInitializing = false;
  initializationError = '';
  cardError = '';

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  private cardMounted = false;
  private publishableKey = '';
  private notificationSeq = Date.now();

  form = this.fb.group({
    cardholderName: ['', Validators.required],
    acknowledge: [false, Validators.requiredTrue],
  });

  get showAcknowledgeError(): boolean {
    const control = this.form.controls.acknowledge;
    return control.invalid && (control.touched || control.dirty);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) {
      return;
    }

    if (this.open) {
      queueMicrotask(() => {
        void this.ensureStripeReady();
      });
      return;
    }

    this.resetUiState();
    this.unmountCardElement();
  }

  ngAfterViewChecked(): void {
    if (this.open && this.cardElement && !this.cardMounted && this.cardElementHost) {
      this.mountCardElement();
    }
  }

  ngOnDestroy(): void {
    this.destroyCardElement();
  }

  onClose(): void {
    this.close.emit();
  }

  async submit(): Promise<void> {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.cardElement || !this.stripe) {
      this.cardError = 'No se pudo inicializar el formulario de tarjeta.';
      this.cdr.markForCheck();
      return;
    }

    this.isSaving = true;
    this.cardError = '';
    this.initializationError = '';
    this.cdr.markForCheck();

    try {
      const setupIntent = await firstValueFrom(this.walletService.createSetupIntent());
      const clientSecret = (setupIntent?.clientSecretDTO ?? '').trim();

      if (!clientSecret) {
        throw new Error('No se recibio el client secret de Stripe.');
      }

      const result = await this.stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: this.form.value.cardholderName?.trim() ?? '',
          },
        },
      });

      if (result.error) {
        this.cardError = result.error.message ?? 'No se pudo registrar la tarjeta.';
        this.pushGlobalNotification(this.cardError, 'error', 12000);
        return;
      }

      const paymentMethodId = this.extractPaymentMethodId(result.setupIntent?.payment_method);
      if (paymentMethodId) {
        this.walletService.promoteCardToDefault(paymentMethodId, 'Tarjeta guardada correctamente.');
      } else {
        this.walletService.refreshCards('Tarjeta guardada correctamente.');
      }

      this.saved.emit();
      this.form.reset({ cardholderName: '', acknowledge: false });
      this.cardElement.clear();
      this.pushGlobalNotification('Tarjeta guardada correctamente.', 'success', 12000);
      this.onClose();
    } catch (error) {
      this.cardError = error instanceof Error ? error.message : 'No se pudo registrar la tarjeta.';
      this.pushGlobalNotification(this.cardError, 'error', 12000);
    } finally {
      this.isSaving = false;
      this.cdr.markForCheck();
    }
  }

  private async ensureStripeReady(): Promise<void> {
    if (this.stripe && this.cardElement) {
      if (!this.cardMounted && this.cardElementHost) {
        this.mountCardElement();
      }
      return;
    }

    if (this.isInitializing) {
      return;
    }

    this.isInitializing = true;
    this.initializationError = '';
    this.cardError = '';
    this.cdr.markForCheck();

    try {
      const isDarkMode = document.documentElement.classList.contains('dark');

      if (!this.publishableKey) {
        const config = await firstValueFrom(this.walletService.getStripePublicConfig());
        this.publishableKey = (config?.publishableKeyDTO ?? '').trim();
      }

      if (!this.publishableKey) {
        throw new Error('No se encontro la llave publica de Stripe.');
      }

      this.stripe = await loadStripe(this.publishableKey);

      if (!this.stripe) {
        throw new Error('No se pudo inicializar Stripe.');
      }

      this.elements = this.stripe.elements({
        appearance: {
          theme: isDarkMode ? 'night' : 'stripe',
          variables: {
            colorPrimary: '#3b82f6',
            colorBackground: isDarkMode ? '#0f172a' : '#ffffff',
            colorText: isDarkMode ? '#f8fafc' : '#111827',
            colorTextPlaceholder: isDarkMode ? '#cbd5e1' : '#6b7280',
            colorDanger: '#ef4444',
            fontFamily: 'inherit',
          },
          rules: {
            '.Input': {
              color: isDarkMode ? '#f8fafc' : '#111827',
              backgroundColor: 'transparent',
            },
            '.Label': {
              color: isDarkMode ? '#f8fafc' : '#111827',
            },
            '.Tab': {
              color: isDarkMode ? '#f8fafc' : '#111827',
            },
            '.Tab:hover': {
              color: isDarkMode ? '#ffffff' : '#000000',
            },
          },
        },
      });

      this.cardElement = this.elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            color: isDarkMode ? '#f8fafc' : '#111827',
            iconColor: isDarkMode ? '#f8fafc' : '#111827',
            fontFamily: 'inherit',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: isDarkMode ? '#cbd5e1' : '#6b7280',
            },
          },
          invalid: {
            color: '#ef4444',
            iconColor: '#ef4444',
          },
        },
      });

      this.cardElement.on('change', (event: StripeCardElementChangeEvent) => {
        this.cardError = event.error?.message ?? '';
        this.cdr.markForCheck();
      });

      if (this.cardElementHost) {
        this.mountCardElement();
      }
    } catch (error) {
      this.initializationError = error instanceof Error
        ? error.message
        : 'No se pudo inicializar Stripe. Verifica la conexion a js.stripe.com.';
    } finally {
      this.isInitializing = false;
      this.cdr.markForCheck();
    }
  }

  private mountCardElement(): void {
    if (!this.cardElementHost || !this.cardElement) {
      return;
    }

    if (this.cardMounted) {
      return;
    }

    this.cardElement.mount(this.cardElementHost.nativeElement);
    this.cardMounted = true;
  }

  private unmountCardElement(): void {
    if (!this.cardElement || !this.cardMounted) {
      return;
    }

    this.cardElement.unmount();
    this.cardMounted = false;
  }

  private destroyCardElement(): void {
    this.unmountCardElement();
    this.cardElement?.destroy();
    this.cardElement = null;
    this.elements = null;
  }

  private resetUiState(): void {
    this.cardError = '';
    this.initializationError = '';
    this.isSaving = false;
    this.isInitializing = false;
  }

  private pushGlobalNotification(
    message: string,
    tone: UploadNotificationSnapshot['tone'],
    ttlMs: number
  ): void {
    const notifications = this.notificationService.getNotifications();
    const next: UploadNotificationSnapshot = {
      id: ++this.notificationSeq,
      tone,
      message,
      expiresAt: Date.now() + ttlMs,
    };
    this.notificationService.setNotifications([...notifications, next]);
  }

  private extractPaymentMethodId(
    paymentMethod: string | { id?: string } | null | undefined
  ): string {
    if (typeof paymentMethod === 'string') {
      return paymentMethod.trim();
    }

    return (paymentMethod?.id ?? '').trim();
  }
}
