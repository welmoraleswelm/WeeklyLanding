import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: 'upload' | 'validate' | 'monitor';
  features: string[];
}

@Component({
  selector: 'app-landing-steps',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingStepsComponent {
  protected readonly steps: StepItem[] = [
    {
      id: 'step-1',
      title: 'Carga tus tickets',
      description: 'Sube archivos en lote o individuales sin fricción desde cualquier dispositivo.',
      icon: 'upload',
      features: [
        'Drag & drop intuitivo',
        'Soporte PDF, XML, imágenes',
        'Carga masiva hasta 1000 tickets',
      ],
    },
    {
      id: 'step-2',
      title: 'Automatiza la validación',
      description: 'Weekly revisa, clasifica y valida cada documento en segundos con IA.',
      icon: 'validate',
      features: [
        'Validación automática',
        'Detección de errores',
        'Clasificación inteligente',
      ],
    },
    {
      id: 'step-3',
      title: 'Monitorea resultados',
      description: 'Sigue estados, alertas y métricas desde tu panel personalizado.',
      icon: 'monitor',
      features: [
        'Dashboard en tiempo real',
        'Alertas configurables',
        'Reportes automáticos',
      ],
    },
  ];
}

