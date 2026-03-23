import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AlertItem,
  CardItem,
  InvoiceItem,
  PlanInfo,
  PlanOption,
  SecurityInfo,
  TaxInfo,
  UsageItem,
} from '../data/wallet.models';
import {
  WALLET_ALERTS,
  WALLET_CARDS,
  WALLET_INVOICES,
  WALLET_PLAN,
  WALLET_PLANS,
  WALLET_SECURITY,
  WALLET_TAX,
  WALLET_USAGE,
} from '../data/wallet.data';

@Injectable({ providedIn: 'root' })
export class WalletMockService {
  private planSubject = new BehaviorSubject<PlanInfo>(WALLET_PLAN);
  private usageSubject = new BehaviorSubject<UsageItem[]>(WALLET_USAGE);
  private cardsSubject = new BehaviorSubject<CardItem[]>(WALLET_CARDS);
  private invoicesSubject = new BehaviorSubject<InvoiceItem[]>(WALLET_INVOICES);
  private alertsSubject = new BehaviorSubject<AlertItem[]>(WALLET_ALERTS);
  private taxSubject = new BehaviorSubject<TaxInfo>(WALLET_TAX);
  private securitySubject = new BehaviorSubject<SecurityInfo>(WALLET_SECURITY);
  private plansSubject = new BehaviorSubject<PlanOption[]>(WALLET_PLANS);
  private messageSubject = new BehaviorSubject<string | null>(null);

  readonly plan$ = this.planSubject.asObservable();
  readonly usage$ = this.usageSubject.asObservable();
  readonly cards$ = this.cardsSubject.asObservable();
  readonly invoices$ = this.invoicesSubject.asObservable();
  readonly alerts$ = this.alertsSubject.asObservable();
  readonly tax$ = this.taxSubject.asObservable();
  readonly security$ = this.securitySubject.asObservable();
  readonly plans$ = this.plansSubject.asObservable();
  readonly message$ = this.messageSubject.asObservable();

  dismissAlert(id: string): void {
    this.alertsSubject.next(this.alertsSubject.value.filter((alert) => alert.id !== id));
  }

  addCard(card: CardItem): void {
    const updated = [card, ...this.cardsSubject.value.map((c) => ({ ...c, isDefault: false }))];
    this.cardsSubject.next(updated);
    this.messageSubject.next('Tarjeta agregada correctamente.');
  }

  setDefaultCard(cardId: string): void {
    const updated = this.cardsSubject.value.map((card) => ({
      ...card,
      isDefault: card.id === cardId,
    }));
    this.cardsSubject.next(updated);
    this.messageSubject.next('Tarjeta principal actualizada.');
  }

  removeCard(cardId: string): void {
    const updated = this.cardsSubject.value.filter((card) => card.id !== cardId);
    this.cardsSubject.next(updated);
    this.messageSubject.next('Tarjeta eliminada.');
  }

  retryPayment(): void {
    const plan = this.planSubject.value;
    this.planSubject.next({ ...plan, status: 'active', nextChargeLabel: 'Próximo cobro: ' + plan.renewalDate });
    this.messageSubject.next('Pago reintentado con éxito.');
    this.dismissAlert('alert-payment');
  }

  updateTaxInfo(tax: TaxInfo): void {
    this.taxSubject.next(tax);
    this.messageSubject.next('Datos fiscales actualizados.');
  }

  changePlan(planId: string): void {
    const plans = this.plansSubject.value.map((plan) => ({ ...plan, isCurrent: plan.id === planId }));
    this.plansSubject.next(plans);
    const selected = plans.find((plan) => plan.id === planId);
    if (selected) {
      this.planSubject.next({
        ...this.planSubject.value,
        name: selected.name,
        priceLabel: selected.priceLabel,
        status: planId === 'plan-free' ? 'free' : 'active',
      });
    }
    this.messageSubject.next('Plan actualizado. Los cambios aplicarán en el próximo ciclo.');
  }

  cancelPlan(): void {
    this.planSubject.next({
      ...this.planSubject.value,
      status: 'paused',
      nextChargeLabel: 'Sin renovación',
    });
    this.messageSubject.next('Suscripción cancelada. Mantienes acceso hasta el fin del ciclo.');
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
}
