import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  template: `
    <!-- Apenas um menu -->
    <app-menu *ngIf="authService.isAuthenticated()"></app-menu>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'user-registration';
  
  constructor(public authService: AuthService) {}

  isLoginPage(): boolean {
    return window.location.pathname === '/login';
  }
}
