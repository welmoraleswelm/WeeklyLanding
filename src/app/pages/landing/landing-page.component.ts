import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { LandingHeroComponent } from './components/landing-hero/landing-hero.component';
import { LandingStepsComponent } from './components/landing-steps/landing-steps.component';
import { LandingPricingComponent } from './components/landing-pricing/landing-pricing.component';
import { LandingTestimonialsComponent } from './components/landing-testimonials/landing-testimonials.component';
import { LandingFaqComponent } from './components/landing-faq/landing-faq.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    LandingNavbarComponent,
    LandingHeroComponent,
    LandingStepsComponent,
    LandingPricingComponent,
    LandingTestimonialsComponent,
    LandingFaqComponent,
    LandingFooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}

