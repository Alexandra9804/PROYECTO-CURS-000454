import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/features/home/router/home.router').then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
