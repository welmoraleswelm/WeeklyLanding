import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { WalletMockService } from '../services/wallet-mock.service';
import { AddCardModalComponent } from '../components/add-card-modal/add-card-modal.component';
import { PaymentMethodsComponent } from '../components/payment-methods/payment-methods.component';
import { CardItem } from '../data/wallet.models';

@Component({
  selector: 'app-pay-method',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    PaymentMethodsComponent,
    AddCardModalComponent,
  ],
  templateUrl: './pay-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayMethodComponent {
  private walletService = inject(WalletMockService);

  readonly cards$ = this.walletService.cards$;
  readonly message$ = this.walletService.message$;

  isAddCardOpen = false;

  openAddCard(): void {
    this.isAddCardOpen = true;
  }

  closeAddCard(): void {
    this.isAddCardOpen = false;
  }

  handleAddCard(card: CardItem): void {
    this.walletService.addCard(card);
  }

  makeDefault(cardId: string): void {
    this.walletService.setDefaultCard(cardId);
  }

  removeCard(cardId: string): void {
    this.walletService.removeCard(cardId);
  }

  clearMessage(): void {
    this.walletService.clearMessage();
  }
}
