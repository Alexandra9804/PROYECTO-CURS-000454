import { Routes } from '@angular/router';

export const MODELS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/model-home/model-home.component').then((m) => m.ModelHomeComponent),
    children: [
      {
        path: 'listado',
        loadComponent: () =>
          import('../components/model-listado/model-listado.component').then(
            (m) => m.ModelListadoComponent
          ),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('../components/model-registro/model-registro.component').then(
            (m) => m.ModelRegistroComponent
          ),
      },

      {
        path: 'registro/:id',
        loadComponent: () =>
          import('../components/model-registro/model-registro.component').then(
            (m) => m.ModelRegistroComponent
          ),
      },
    ],
  },
];
