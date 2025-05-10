import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo, TipoVeiculo, StatusVeiculo } from '../../models/veiculo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-veiculo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  mostrarFormulario = false;
  veiculoForm: FormGroup;
  veiculos: Veiculo[] = [];
  editando = false;
  veiculoId: number | undefined = undefined;  // Alterado de null para undefined
  mensagem: string = '';
  tipoMensagem: 'success' | 'error' | '' = '';
  tiposVeiculo = Object.values(TipoVeiculo);
  statusVeiculo = Object.values(StatusVeiculo);

  constructor(
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService
  ) {
    this.veiculoForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      cor: ['', Validators.required],
      chassi: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{17}$')]],
      placa: ['', [Validators.required, Validators.pattern('^[A-Z]{3}[0-9][A-Z][0-9]{2}$')]],
      frota: ['', Validators.required],
      tipoVeiculo: [TipoVeiculo.CARRO, Validators.required],
      status: [StatusVeiculo.ATIVO, Validators.required]
    });
  }

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.listarVeiculos().subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
      },
      error: (error) => {
        console.error('Erro ao carregar veículos:', error);
        this.mostrarMensagem('Erro ao carregar veículos.', 'error');
      }
    });
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      if (this.editando && this.veiculoId) {
        this.veiculoService.atualizarVeiculo(this.veiculoId, this.veiculoForm.value).subscribe({
          next: () => {
            this.carregarVeiculos();
            this.resetarFormulario();
            this.mostrarMensagem('Veículo atualizado com sucesso!', 'success');
          },
          error: (error) => {
            console.error('Erro ao atualizar veículo:', error);
            this.mostrarMensagem('Erro ao atualizar veículo.', 'error');
          }
        });
      } else {
        this.veiculoService.cadastrarVeiculo(this.veiculoForm.value).subscribe({
          next: () => {
            this.carregarVeiculos();
            this.resetarFormulario();
            this.mostrarMensagem('Veículo cadastrado com sucesso!', 'success');
          },
          error: (error) => {
            console.error('Erro ao cadastrar veículo:', error);
            this.mostrarMensagem('Erro ao cadastrar veículo.', 'error');
          }
        });
      }
    }
  }

  editarVeiculo(veiculo: Veiculo) {
    this.editando = true;
    this.veiculoId = veiculo.id;
    this.veiculoForm.patchValue(veiculo);
  }

  deletarVeiculo(id: number | undefined) {
    if (id === undefined) return;

    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.deletarVeiculo(id).subscribe({
        next: () => {
          this.carregarVeiculos();
          this.mostrarMensagem('Veículo excluído com sucesso!', 'success');
        },
        error: (error) => {
          console.error('Erro ao deletar veículo:', error);
          this.mostrarMensagem('Erro ao deletar veículo.', 'error');
        }
      });
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

  abrirFormularioCadastro() {
    this.editando = false;
    this.limparFormulario();
    this.mostrarFormulario = true;
  }

  cancelarEdicao() {
    this.resetarFormulario();
    this.mostrarFormulario = false;
  }

  private resetarFormulario() {
    this.limparFormulario();
    this.mostrarFormulario = false;
  }

  limparFormulario() {
    this.veiculoForm.reset({
      tipoVeiculo: TipoVeiculo.CARRO,
      status: StatusVeiculo.ATIVO
    });
    this.editando = false;
    this.veiculoId = undefined;
  }
}
