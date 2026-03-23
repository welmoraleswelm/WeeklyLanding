import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PaymentMethodSummary {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  status: string;
  autoRenewEnabled: boolean;
}

@Component({
  selector: 'app-payment-method-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-method-card.component.html',
})
export class PaymentMethodCardComponent {
  @Input() method: PaymentMethodSummary | null = null;
}
