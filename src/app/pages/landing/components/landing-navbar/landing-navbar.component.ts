import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingNavbarComponent implements OnInit {
  protected readonly isScrolled = signal(false);
  protected readonly isMobileMenuOpen = signal(false);

  protected readonly links: NavLink[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Funciones', href: '#funciones' },
    { label: 'Planes', href: '#planes' },
    { label: 'Reseñas', href: '#reviews' },
    { label: 'Preguntas frecuentes', href: '#faq' },
  ];

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY > 20),
        startWith(window.scrollY > 20),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => this.isScrolled.set(value));
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}


