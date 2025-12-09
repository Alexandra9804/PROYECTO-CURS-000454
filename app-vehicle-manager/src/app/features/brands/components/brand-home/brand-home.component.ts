import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand-home.component',
  imports: [RouterOutlet],
  templateUrl: './brand-home.component.html',
  styleUrl: './brand-home.component.scss',
})
export class BrandHomeComponent {
  private readonly router = inject(Router);

  irListado() {
    this.router.navigate(['home/brands/listado']);
  }

  irRegistro() {
    this.router.navigate(['home/brands/registro']);
  }
}
