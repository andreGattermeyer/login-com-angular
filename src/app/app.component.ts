import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  template: `
    <app-menu *ngIf="shouldShowMenu()"></app-menu>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) {}

  shouldShowMenu(): boolean {
    return !this.router.url.includes('login');
  }
}
