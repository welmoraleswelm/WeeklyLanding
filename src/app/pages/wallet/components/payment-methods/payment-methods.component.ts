import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItem } from '../../data/wallet.models';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-methods.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent {
  @Input() cards: CardItem[] = [];
  @Input() autoRenewEnabled = false;
  @Input() autoRenewAvailable = false;
  @Input() autoRenewDisabled = false;
  @Output() add = new EventEmitter<void>();
  @Output() makeDefault = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() toggleAutoRenew = new EventEmitter<boolean>();

  get activeCard(): CardItem | null {
    return this.cards.find((card) => card.isDefault) ?? this.cards[0] ?? null;
  }

  get shouldScrollCards(): boolean {
    return this.cards.length > 3;
  }

  getBrandName(brand: string): string {
    const normalized = brand.trim().toLowerCase();
    if (normalized === 'visa') return 'Visa';
    if (normalized === 'mastercard') return 'Mastercard';
    if (!normalized.length) return 'Tarjeta';
    return brand;
  }

  isVisa(brand: string): boolean {
    return brand.trim().toLowerCase() === 'visa';
  }

  isMastercard(brand: string): boolean {
    return brand.trim().toLowerCase() === 'mastercard';
  }

  onAdd(): void {
    this.add.emit();
  }

  onMakeDefault(cardId: string): void {
    this.makeDefault.emit(cardId);
  }

  onRemove(cardId: string): void {
    this.remove.emit(cardId);
  }

  onToggleAutoRenew(): void {
    if (!this.autoRenewAvailable || this.autoRenewDisabled) {
      return;
    }

    this.toggleAutoRenew.emit(!this.autoRenewEnabled);
  }
}
