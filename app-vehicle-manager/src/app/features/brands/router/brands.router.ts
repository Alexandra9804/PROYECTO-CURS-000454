  import { Routes } from "@angular/router";

  export const BRANDS_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('../components/brand-home/brand-home.component').then((m) => m.BrandHomeComponent),
      children: [
        {
          path: 'listado',
          loadComponent: () =>
            import('../components/brand-listado/brand-listado.component').then(
              (m) => m.BrandListadoComponent
            ),
        },
        {
          path: 'registro',
          loadComponent: () =>
            import('../components/brand-registro/brand-registro.component').then(
              (m) => m.BrandRegistroComponent
            ),
        },

        {
          path: 'registro/:id',
          loadComponent: () =>
            import('../components/brand-registro/brand-registro.component').then(
              (m) => m.BrandRegistroComponent
            ),
        },
      ],
    },
  ];