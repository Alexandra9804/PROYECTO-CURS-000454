import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private menuService: MenuService) {}
  isShoMenu() {
    this.menuService.toggleMenu();
  }
}
