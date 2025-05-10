import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { VeiculoService } from '../../../services/veiculo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statusChart: any;
  tipoChart: any;
  totalVeiculos: number = 0;

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.veiculoService.listarVeiculos().subscribe(veiculos => {
      this.totalVeiculos = veiculos.length;
      
      // Dados para o gráfico de status
      const statusData = {
        'ATIVO': veiculos.filter(v => v.status === 'ATIVO').length,
        'EM_MANUTENCAO': veiculos.filter(v => v.status === 'EM_MANUTENCAO').length,
        'INATIVO': veiculos.filter(v => v.status === 'INATIVO').length
      };

      // Dados para o gráfico de tipos
      const tiposData = veiculos.reduce((acc: any, veiculo) => {
        acc[veiculo.tipoVeiculo] = (acc[veiculo.tipoVeiculo] || 0) + 1;
        return acc;
      }, {});

      this.criarGraficoStatus(statusData);
      this.criarGraficoTipos(tiposData);
    });
  }

  criarGraficoStatus(dados: any) {
    if (this.statusChart) {
      this.statusChart.destroy();
    }

    this.statusChart = new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: Object.keys(dados),
        datasets: [{
          data: Object.values(dados),
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribuição por Status'
          }
        }
      }
    });
  }

  criarGraficoTipos(dados: any) {
    if (this.tipoChart) {
      this.tipoChart.destroy();
    }

    this.tipoChart = new Chart('tipoChart', {
      type: 'bar',
      data: {
        labels: Object.keys(dados),
        datasets: [{
          label: 'Quantidade por Tipo',
          data: Object.values(dados),
          backgroundColor: '#2196F3'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Veículos por Tipo'
          }
        }
      }
    });
  }
}