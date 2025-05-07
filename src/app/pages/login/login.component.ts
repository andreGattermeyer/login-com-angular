import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router  // Adicione esta linha
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Resposta completa do login:', response); // Para debug
          const userRole = response.role || 'ROLE_ADMIN';
          console.log('Role definida:', userRole); // Para debug
          
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', userRole);
          this.authService.setUsername(this.loginForm.get('username')?.value);
          
          if (userRole === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (userRole === 'ROLE_USER') {
            this.router.navigate(['/user']);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          this.loading = false;
        }
      });
    }
}
}
