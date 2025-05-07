import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>
      <div class="alert alert-success" *ngIf="message">
        {{ message }}
      </div>
    </div>
  `
})
export class AdminComponent {
  message: string = '';

  constructor(private http: HttpClient) {
    this.loadAdminData();
  }

  private loadAdminData() {
    this.http.get<string>('http://localhost:8080/admin')
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (error) => {
          console.error('Error accessing admin page:', error);
        }
      });
  }
}