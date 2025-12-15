import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'brands',
        loadChildren: () =>
          import('../../brands/router/brands.router').then((m) => m.BRANDS_ROUTES),
      },
      {
        path: 'models',
        loadChildren: () =>
          import('../../models/router/models.router').then((m) => m.MODELS_ROUTES),
      },
    ],
  },
];
