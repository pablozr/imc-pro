import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ImcChartComponent } from '../../components/imc-chart/imc-chart.component';
import { imc } from '../../interfaces/Iimc';
import { ImcService } from '../../services/imc-service.service';
import { inject } from '@angular/core';
import { HeaderComponent } from '../../../global/components/header/header.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TableModule, RouterLink, ImcChartComponent, HeaderComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  historico : imc[] = []

  imcService = inject(ImcService);

  ngOnInit() {
    this.imcService.records$.subscribe(records => {
      this.historico = records as imc[];
    });
  }

  clearHistory() {
    this.imcService['clearAllHistory']();
    this.historico = [];
  }
}
