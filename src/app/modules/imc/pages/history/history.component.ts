import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { imc } from '../../interfaces/Iimc';
import { ImcService } from '../../services/imc/imc-service.service';
import { inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { HeaderComponent } from '../../../global/components/header/header.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TableModule, RouterLink, HeaderComponent, ChartModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  historico : imc[] = []
  chartData: any;
  chartOptions: any;
  

  imcService = inject(ImcService);

  ngOnInit() {
    this.imcService.records$.subscribe(records => {
      this.historico = records as imc[];
      this.prepareChartData(records);
    });

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },
          title: {
            display: true,
            text: 'Data'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },
          title: {
            display: true,
            text: 'IMC'
          }
        }
      }
    };
  }

  clearHistory() {
    this.imcService['clearAllHistory']();
    this.historico = [];
  }

  prepareChartData(records: imc[]) {
    if(!records || records.length === 0) {
      this.chartData = null;
      return;
    }

    const labels = records.map(record => new Date(record.data).toLocaleDateString());
    const data = records.map(record => record.imc);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'IMC',
          data: data,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };
  }

}
