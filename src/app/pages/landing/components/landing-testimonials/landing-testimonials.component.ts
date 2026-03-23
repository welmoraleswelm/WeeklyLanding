import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

@Component({
  selector: 'app-landing-testimonials',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTestimonialsComponent {
  protected readonly testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'María Santos',
      role: 'Directora de Operaciones',
      company: 'FinPay Solutions',
      quote: 'Weekly nos dio visibilidad total y menos retrabajos en facturación. Pasamos de procesar 200 tickets diarios a más de 1,500 sin aumentar el equipo.',
    },
    {
      id: 't-2',
      name: 'José Martínez',
      role: 'Gerente de Contabilidad',
      company: 'RetailMax',
      quote: 'Los tiempos de validación bajaron a la mitad con su panel. La automatización nos ha ahorrado más de 40 horas semanales en tareas repetitivas.',
    },
    {
      id: 't-3',
      name: 'Carla Rivera',
      role: 'Head of Backoffice',
      company: 'CloudTech SaaS',
      quote: 'El equipo tiene control del backlog y alertas en tiempo real. La integración fue sencilla y el soporte técnico es excepcional.',
    },
  ];

  private readonly avatarGradients = [
    'from-brand-500 to-brand-700',
    'from-emerald-500 to-teal-500',
    'from-brand-500 to-brand-700',
    'from-blue-500 to-cyan-500',
    'from-brand-500 to-brand-700',
    'from-brand-400 to-brand-600',
  ];

  protected getAvatarGradient(index: number): string {
    return this.avatarGradients[index % this.avatarGradients.length];
  }
}





