import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

export type RevealAnimation =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleIn'
  | 'scaleUp'
  | 'rotateIn'
  | 'blurIn'
  | 'slideUp'
  | 'bounceIn'
  | 'flipIn';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input('revealOnScroll') animation: RevealAnimation = 'fadeUp';
  @Input() delay = 0;
  @Input() duration = 600;
  @Input() threshold = 0.15;
  @Input() once = true;
  @Input() easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  private observer?: IntersectionObserver;
  private state: 'hidden' | 'visible' = 'hidden';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('class.reveal') baseClass = true;

  @HostBinding('class.is-visible')
  get isVisible(): boolean {
    return this.state === 'visible';
  }

  @HostBinding('attr.data-reveal')
  get revealType(): RevealAnimation {
    return this.animation;
  }

  @HostBinding('style.--reveal-delay')
  get cssDelay(): string {
    return `${this.delay}ms`;
  }

  @HostBinding('style.--reveal-duration')
  get cssDuration(): string {
    return `${this.duration}ms`;
  }

  @HostBinding('style.--reveal-easing')
  get cssEasing(): string {
    return this.easing;
  }

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;

    const delayAttr = el.dataset['delay'];
    if (delayAttr) {
      const parsed = Number(delayAttr);
      if (!Number.isNaN(parsed)) this.delay = parsed;
    }

    const durationAttr = el.dataset['duration'];
    if (durationAttr) {
      const parsed = Number(durationAttr);
      if (!Number.isNaN(parsed)) this.duration = parsed;
    }

    this.state = 'hidden';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.state = 'visible';
          if (this.once) {
            this.observer?.disconnect();
          }
        } else if (!this.once) {
          this.state = 'hidden';
        }
      },
      { threshold: this.threshold, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

