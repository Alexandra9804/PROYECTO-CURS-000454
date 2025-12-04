import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { NavComponent } from '../../../../shared/components/nav/nav.component';

@Component({
  selector: 'app-home.component',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
