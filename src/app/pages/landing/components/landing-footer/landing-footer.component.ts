import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: 'twitter' | 'linkedin' | 'github' | 'youtube' | 'instagram';
}

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly emailValue = signal('');
  protected readonly isSubscribing = signal(false);
  protected readonly subscribeSuccess = signal(false);

  protected readonly footerSections: FooterSection[] = [
    {
      title: 'Producto',
      links: [
        { label: 'Funciones', href: '#funciones' },
        { label: 'Planes y precios', href: '#planes' },
        { label: 'Testimonios', href: '#reviews' },
        { label: 'Integraciones', href: '#' },
        { label: 'Actualizaciones', href: '#', isExternal: true },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Centro de ayuda', href: '#' },
        { label: 'Documentación API', href: '#', isExternal: true },
        { label: 'Guías y tutoriales', href: '#' },
        { label: 'Blog', href: '#', isExternal: true },
        { label: 'Estado del servicio', href: '#', isExternal: true },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre nosotros', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Prensa', href: '#' },
        { label: 'Contacto', href: '#' },
        { label: 'Partners', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '#' },
        { label: 'Términos de uso', href: '#' },
        { label: 'Política de cookies', href: '#' },
        { label: 'Seguridad', href: '#' },
        { label: 'GDPR', href: '#' },
      ],
    },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
  ];

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.emailValue.set(input.value);
  }

  async onSubscribe(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.emailValue() || this.isSubscribing()) return;

    this.isSubscribing.set(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.isSubscribing.set(false);
    this.subscribeSuccess.set(true);
    this.emailValue.set('');

    // Reset success message after 3 seconds
    setTimeout(() => this.subscribeSuccess.set(false), 3000);
  }
}

