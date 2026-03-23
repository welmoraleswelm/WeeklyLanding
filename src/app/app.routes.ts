import { Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { TicketManagementComponent } from './pages/ticket-management/ticket-management.component';
import { ContributorsManagementComponent } from './pages/contributors-management/contributors-management.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { LandingComponent } from './pages/landing/landing.component'
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
    title: 'Landing'
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
        title: 'Dashboard | Home',
      },
      {
        path: 'ticket-management',
        component: TicketManagementComponent,
        title: 'Gestion de Tickets'
      },
      {
        path: 'contributors-management',
        component: ContributorsManagementComponent,
        title: 'Gestion de contribuyentes'
      },
      {
        path: 'profile-management',
        component: ProfileManagementComponent,
        title: 'Administrar cuenta - Perfil'
      },
      {
        path: 'wallet',
        component: WalletComponent,
        title: 'Administrar cuenta - Cartera'
      },
      {
        path: 'support',
        loadChildren: () => import('./pages/support/support.routes').then((m) => m.SUPPORT_ROUTES),
      }
    ]
  },
  // auth pages disabled in navigation
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Iniciar sesión'
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Crear cuenta'
  },
  // error pages
  {
    path: '**',
    component: NotFoundComponent,
    title: 'NotFound Dashboard | Weekly'
  },
];



