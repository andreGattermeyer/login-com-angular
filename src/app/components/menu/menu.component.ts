import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    CommonModule, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
[x: string]: any;
  userRole: string | null = null;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.username = this.authService.getUsername();
    console.log('Role no OnInit:', this.userRole); // Para debug
  }

  logout() {
    this.authService.logout();
  }
}
