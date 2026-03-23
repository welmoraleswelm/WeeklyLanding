import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing';
}

@Component({
  selector: 'app-landing-faq',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFaqComponent {
  protected readonly openId = signal<string | null>(null);
  protected readonly activeCategory = signal<'all' | 'general' | 'technical' | 'billing'>('all');

  protected readonly categories = [
    { id: 'all', label: 'Todas', icon: 'grid' },
    { id: 'general', label: 'General', icon: 'info' },
    { id: 'technical', label: 'Técnico', icon: 'code' },
    { id: 'billing', label: 'Facturación', icon: 'card' },
  ] as const;

  protected readonly faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: '¿Necesito integraciones para usar Weekly?',
      answer: 'No, puedes empezar a usar Weekly de inmediato sin necesidad de integraciones complejas. Nuestra plataforma funciona de forma independiente, pero también ofrece conectores para los sistemas más populares como SAP, QuickBooks, Xero y más cuando estés listo para escalar.',
      category: 'general',
    },
    {
      id: 'faq-2',
      question: '¿Weekly funciona con tickets masivos?',
      answer: 'Absolutamente. Weekly está diseñado para manejar grandes volúmenes. Puedes subir lotes de hasta 10,000 tickets simultáneamente y monitorear el estado de cada uno en tiempo real desde tu panel personalizado. Nuestro motor de procesamiento con IA puede validar más de 1,000 tickets por minuto.',
      category: 'technical',
    },
    {
      id: 'faq-3',
      question: '¿Cómo se maneja la seguridad de datos?',
      answer: 'La seguridad es nuestra prioridad. Weekly cumple con estándares internacionales como SOC 2 Type II, GDPR e ISO 27001. Todos los datos se encriptan en tránsito y en reposo, y ofrecemos control de acceso granular basado en roles para tu equipo.',
      category: 'technical',
    },
    {
      id: 'faq-4',
      question: '¿Cuánto tiempo toma implementar Weekly?',
      answer: 'La mayoría de equipos están operando en menos de 24 horas. Nuestra configuración guiada te lleva paso a paso, y nuestro equipo de Customer Success está disponible para ayudarte durante todo el proceso de onboarding sin costo adicional.',
      category: 'general',
    },
    {
      id: 'faq-5',
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento sin penalizaciones. Los cambios se aplican de inmediato y solo pagas la diferencia prorrateada. También ofrecemos una garantía de devolución de 30 días si no estás satisfecho.',
      category: 'billing',
    },
    {
      id: 'faq-6',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express), transferencias bancarias y PayPal. Para planes Enterprise, también ofrecemos facturación personalizada y términos de pago NET-30.',
      category: 'billing',
    },
    {
      id: 'faq-7',
      question: '¿Ofrecen API para desarrolladores?',
      answer: 'Sí, tenemos una API REST completa y bien documentada que te permite integrar Weekly con tus sistemas existentes. Incluimos SDKs para Python, JavaScript, PHP y .NET, además de webhooks para notificaciones en tiempo real.',
      category: 'technical',
    },
    {
      id: 'faq-8',
      question: '¿Qué soporte técnico incluyen los planes?',
      answer: 'Todos los planes incluyen soporte por email con respuesta en 24 horas. Los planes Premium y Enterprise incluyen chat en vivo, soporte telefónico prioritario y un Customer Success Manager dedicado para ayudarte a maximizar el valor de Weekly.',
      category: 'general',
    },
  ];

  protected get filteredFaqs(): FaqItem[] {
    if (this.activeCategory() === 'all') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.activeCategory());
  }

  toggle(id: string): void {
    this.openId.set(this.openId() === id ? null : id);
  }

  isOpen(id: string): boolean {
    return this.openId() === id;
  }

  setCategory(category: 'all' | 'general' | 'technical' | 'billing'): void {
    this.activeCategory.set(category);
    this.openId.set(null);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-brand-600 dark:bg-blue-900/30 dark:text-brand-400',
      technical: 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
      billing: 'bg-emerald-100 text-brand-600 dark:bg-emerald-900/30 dark:text-brand-400',
    };
    return colors[category] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  }
}




