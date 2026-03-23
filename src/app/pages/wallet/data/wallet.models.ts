export type PlanStatus = 'active' | 'paused' | 'payment_failed' | 'free';
export type InvoiceStatus = 'paid' | 'failed' | 'refunded';
export type AlertType = 'payment_failed' | 'card_expiring' | 'usage_warning';

export interface PlanInfo {
  id: string;
  name: string;
  priceLabel: string;
  renewalDate: string;
  status: PlanStatus;
  nextChargeLabel: string;
  description: string;
  autoRenewEnabled: boolean;
}

export interface UsageItem {
  id: string;
  label: string;
  used: number;
  limit: number;
  tone: 'brand' | 'emerald' | 'amber';
}

export interface CardItem {
  id: string;
  cardholderName?: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface InvoiceItem {
  id: string;
  date: string;
  concept: string;
  amount: string;
  status: InvoiceStatus;
  receiptUrl?: string;
}

export interface TaxInfo {
  rfc: string;
  razonSocial: string;
  usoCfdi: string;
  emailFacturacion: string;
  domicilioFiscal?: string;
}

export interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  ctaLabel?: string;
}

export interface SecurityInfo {
  mfaEnabled: boolean;
  recentSessions: Array<{ id: string; device: string; location: string; lastActive: string }>;
}

export interface PlanOption {
  id: string;
  name: string;
  priceLabel: string;
  perks: string[];
  isCurrent: boolean;
}


