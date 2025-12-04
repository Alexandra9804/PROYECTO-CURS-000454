import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'brands',
        loadChildren: () =>
          import('../../brands/router/brands.router').then((m) => m.CARGOS_ROUTES),
      }
    ],
  },
];
