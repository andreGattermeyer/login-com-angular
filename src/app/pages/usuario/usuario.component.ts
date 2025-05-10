import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  mostrarFormulario = false;
  usuarioForm: FormGroup;
  usuarios: Usuario[] = [];
  editando = false;
  usuarioId: number | null = null;
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | '' = '';

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required]  // Valor padrão como ROLE_USER
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
    // Atualiza a lista de usuários a cada 30 segundos
    setInterval(() => {
      this.carregarUsuarios();
    }, 30000);
  }

  carregarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      if (this.editando && this.usuarioId) {
        this.usuarioService.atualizarUsuario(this.usuarioId, this.usuarioForm.value).subscribe({
          next: () => {
            this.carregarUsuarios();
            this.resetarFormulario();
            this.mostrarMensagem('Usuário atualizado com sucesso!', 'success');
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.mostrarMensagem('Erro ao atualizar usuário.', 'error');
          }
        });
      } else {
        this.usuarioService.cadastrarUsuario(this.usuarioForm.value).subscribe({
          next: () => {
            this.carregarUsuarios();
            this.resetarFormulario();
            this.mostrarMensagem('Usuário cadastrado com sucesso!', 'success');
          },
          error: (error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this.mostrarMensagem('Erro ao cadastrar usuário.', 'error');
          }
        });
      }
    }
  }

  private mostrarMensagem(texto: string, tipo: 'success' | 'error') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 3000);
  }

  editarUsuario(usuario: Usuario) {
    this.editando = true;
    if (usuario.id !== undefined) {
      this.usuarioId = usuario.id;
    }
    this.usuarioForm.patchValue({
      username: usuario.username,
      email: usuario.email,
      role: usuario.role
    });
    this.usuarioForm.get('password')?.setValidators(null);
    this.usuarioForm.get('password')?.updateValueAndValidity();
}

deletarUsuario(id: number | undefined) {
    if (id === undefined) {
        console.error('ID do usuário não definido');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        this.usuarioService.deletarUsuario(id).subscribe({
            next: () => {
                this.carregarUsuarios();
            },
            error: (error) => console.error('Erro ao deletar usuário:', error)
        });
    }
}

  cancelarEdicao() {
    this.resetarFormulario();
    this.mostrarFormulario = false;
  }

  private resetarFormulario() {
    this.limparFormulario();
    this.usuarioForm.get('password')?.setValidators(Validators.required);
    this.usuarioForm.get('password')?.updateValueAndValidity();
    this.mostrarFormulario = false;
  }

  abrirFormularioCadastro() {
    this.editando = false;
    this.limparFormulario();
    this.mostrarFormulario = true;
    this.usuarioForm.get('password')?.setValidators(Validators.required);
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  limparFormulario() {
    this.usuarioForm.reset({
      role: 'USER' // Mantém o valor padrão do role
    });
    this.editando = false;
    this.usuarioId = null;
  }
}
