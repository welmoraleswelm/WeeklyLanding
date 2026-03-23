import { AlertItem, CardItem, InvoiceItem, PlanInfo, PlanOption, SecurityInfo, TaxInfo, UsageItem } from './wallet.models';

export const WALLET_PLAN: PlanInfo = {
  id: 'plan-pro',
  name: 'Plan Pro Mensual',
  priceLabel: '$399 MXN/mes',
  renewalDate: '12 feb. 2026',
  status: 'payment_failed',
  nextChargeLabel: 'Proximo cobro pendiente',
  description: 'Facturacion inteligente con validaciones fiscales avanzadas.',
  autoRenewEnabled: false,
};

export const WALLET_USAGE: UsageItem[] = [
  { id: 'usage-tickets', label: 'Tickets procesados', used: 420, limit: 500, tone: 'brand' },
  { id: 'usage-retries', label: 'Reintentos usados', used: 28, limit: 40, tone: 'amber' },
  { id: 'usage-automations', label: 'Automatizaciones activas', used: 8, limit: 10, tone: 'emerald' },
];

export const WALLET_CARDS: CardItem[] = [
  { id: 'card-1', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2028, isDefault: true },
  { id: 'card-2', brand: 'Mastercard', last4: '5589', expMonth: 7, expYear: 2026, isDefault: false },
];

export const WALLET_INVOICES: InvoiceItem[] = [
  { id: 'inv-1', date: '12 ene. 2026', concept: 'Plan Pro Mensual', amount: '$399 MXN', status: 'paid' },
  { id: 'inv-2', date: '12 dic. 2025', concept: 'Plan Pro Mensual', amount: '$399 MXN', status: 'paid' },
  { id: 'inv-3', date: '12 nov. 2025', concept: 'Plan Pro Mensual', amount: '$399 MXN', status: 'failed' },
  { id: 'inv-4', date: '12 oct. 2025', concept: 'Plan Pro Mensual', amount: '$399 MXN', status: 'refunded' },
];

export const WALLET_ALERTS: AlertItem[] = [
  {
    id: 'alert-payment',
    type: 'payment_failed',
    title: 'Pago fallido',
    description: 'El ultimo intento de cobro fallo. Actualiza tu tarjeta o reintenta el pago.',
    ctaLabel: 'Reintentar pago',
  },
  {
    id: 'alert-card',
    type: 'card_expiring',
    title: 'Tarjeta por vencer',
    description: 'La tarjeta Mastercard ••5589 vence pronto. Actualizala para evitar interrupciones.',
    ctaLabel: 'Actualizar tarjeta',
  },
  {
    id: 'alert-usage',
    type: 'usage_warning',
    title: 'Consumo alto',
    description: 'Has usado 84% de tus tickets mensuales.',
    ctaLabel: 'Ver uso',
  },
];

export const WALLET_TAX: TaxInfo = {
  rfc: 'XAXX010101000',
  razonSocial: 'Innova Tickets S.A. de C.V.',
  usoCfdi: 'G03 - Gastos en general',
  emailFacturacion: 'facturacion@innovatickets.com',
  domicilioFiscal: 'Av. Reforma 120, CDMX',
};

export const WALLET_SECURITY: SecurityInfo = {
  mfaEnabled: false,
  recentSessions: [],
};

export const WALLET_PLANS: PlanOption[] = [
  {
    id: 'plan-free',
    name: 'Gratis',
    priceLabel: '$0 MXN',
    perks: ['50 tickets/mes', 'OCR basico', 'Soporte comunitario'],
    isCurrent: false,
  },
  {
    id: 'plan-pro',
    name: 'Pro Mensual',
    priceLabel: '$399 MXN/mes',
    perks: ['500 tickets/mes', 'Reintentos automaticos', 'Soporte prioritario'],
    isCurrent: true,
  },
  {
    id: 'plan-scale',
    name: 'Anual',
    priceLabel: '$3,999 MXN/año',
    perks: ['5,000 tickets/mes', 'Automatizaciones avanzadas', 'SLA dedicado'],
    isCurrent: false,
  },
];

