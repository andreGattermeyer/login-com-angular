import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>User Dashboard</h2>
      <div class="alert alert-success" *ngIf="message">
        {{ message }}
      </div>
    </div>
  `
})
export class UserComponent {
  message: string = '';

  constructor(private http: HttpClient) {
    this.loadUserData();
  }

  private loadUserData() {
    this.http.get<string>('http://localhost:8080/user')
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (error) => {
          console.error('Error accessing user page:', error);
        }
      });
  }
}