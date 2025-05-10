import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          // Armazena o token com o prefixo Bearer
          localStorage.setItem('token', `Bearer ${response.token}`);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', credentials.username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  setUsername(username: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('username', username);
    }
  }

  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('username');
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }
}
