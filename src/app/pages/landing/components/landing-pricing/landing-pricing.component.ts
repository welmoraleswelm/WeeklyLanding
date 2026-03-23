import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthly: string;
  annual: string;
  highlighted?: boolean;
  features: string[];
}

@Component({
  selector: 'app-landing-pricing',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPricingComponent {
  protected readonly billing = signal<'monthly' | 'annual'>('monthly');

  protected readonly plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Básico',
      description: 'Ideal para equipos pequeños.',
      monthly: '$49',
      annual: '$39',
      features: ['200 tickets/mes', 'Soporte estándar', 'Reportes básicos'],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'El plan más popular para escalar.',
      monthly: '$89',
      annual: '$69',
      highlighted: true,
      features: ['Tickets ilimitados', 'Automatizaciones', 'SLA prioritario'],
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      description: 'Pensado para operaciones avanzadas.',
      monthly: 'A la medida',
      annual: 'A la medida',
      features: ['Custom workflows', 'Integraciones', 'Success manager'],
    },
  ];

  setBilling(value: 'monthly' | 'annual'): void {
    this.billing.set(value);
  }

  priceFor(plan: PricingPlan): string {
    return this.billing() === 'monthly' ? plan.monthly : plan.annual;
  }
}



