import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  { 
    path: 'user', 
    component: UserComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'usuarios', 
    component: UsuarioComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
