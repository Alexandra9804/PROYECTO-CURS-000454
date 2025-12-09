import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly menuService = inject(MenuService);

  isShoMenu() {
    this.menuService.toggleMenu();
  }
}
