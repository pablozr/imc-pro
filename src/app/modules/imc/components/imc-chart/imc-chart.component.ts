import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { inject } from '@angular/core';
import { ImcService } from '../../services/imc-service.service';
import { imc } from '../../interfaces/Iimc';

@Component({
  selector: 'app-imc-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './imc-chart.component.html',
  styleUrl: './imc-chart.component.scss'
})
export class ImcChartComponent {
  imcService = inject(ImcService);

  chartData: any;
  chartOptions: any;
  
  ngOnInit() {
    this.imcService.records$.subscribe((records: imc[]) => {
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
