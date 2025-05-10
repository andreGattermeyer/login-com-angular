import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gerenciamento de Usuários</h5>
              <p class="card-text">Cadastre e gerencie os usuários do sistema.</p>
              <a routerLink="/usuarios" class="btn btn-primary">Acessar</a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gerenciamento de Veículos</h5>
              <p class="card-text">Cadastre e gerencie os veículos do sistema.</p>
              <a routerLink="/veiculos" class="btn btn-primary">Acessar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {
  constructor() {}
}