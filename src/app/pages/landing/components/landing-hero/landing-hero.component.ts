import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './landing-hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeroComponent implements OnInit {
  protected readonly parallax = signal(0);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => {
          if (window.innerWidth < 1024) return 0;
          return Math.min(window.scrollY * 0.05, 24);
        }),
        startWith(0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => this.parallax.set(value));
  }
}

