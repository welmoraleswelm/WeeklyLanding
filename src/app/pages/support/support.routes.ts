import { Routes } from '@angular/router';
import { SupportComponent } from './support.component';
import { SupportHistoryComponent } from './support-history.component';

export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SupportComponent,
    title: 'Soporte',
  },
  {
    path: 'history',
    component: SupportHistoryComponent,
    title: 'Historial de soporte',
  },
];
