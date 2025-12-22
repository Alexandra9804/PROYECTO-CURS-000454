import { Routes } from '@angular/router';

export const VEHICLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/vehicle-home/vehicle-home.component').then((m) => m.VehicleHomeComponent),
    children: [
      {
        path: 'listado',
        loadComponent: () =>
          import('../components/vehicle-listado/vehicle-listado.component').then(
            (m) => m.VehicleListadoComponent
          ),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('../components/vehicle-registro/vehicle-registro.component').then(
            (m) => m.VehicleRegistroComponent
          ),
      },

      {
        path: 'registro/:id',
        loadComponent: () =>
          import('../components/vehicle-registro/vehicle-registro.component').then(
            (m) => m.VehicleRegistroComponent
          ),
      },
    ],
  },
];
