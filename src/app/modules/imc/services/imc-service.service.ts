import { Injectable } from '@angular/core';
import { imc } from '../interfaces/Iimc';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ImcService {
  private readonly imcStorageKey = 'imcRecords';
  private recordsSubject = new BehaviorSubject<imc[]>(this.loadRecords());
  records$ = this.recordsSubject.asObservable();
  constructor() { 
    this.recordsSubject.next(this.loadRecords());
  }

  calcularIMC(peso: number, altura: number): imc {
    const alturaEmMetros = altura / 100;
    const imc = parseFloat((peso / (alturaEmMetros * alturaEmMetros)).toFixed(2));

    const classificacao = this.getClassificacao(imc);

    const resultado : imc = {
      peso,
      altura,
      imc,
      classificacao,
      data: new Date()
    };

    this.adicionarHistorico(resultado);
    return resultado;
  }
  private getClassificacao(imc: number): string {
    if (imc < 18.5) 
      return 'Abaixo do peso';

    if (imc >= 18.5 && imc < 24.9) 
      return 'Peso normal';

    if (imc >= 25 && imc < 29.9)
      return 'Sobrepeso';
    if (imc >= 30 && imc < 34.9)
      return 'Obesidade grau 1';
    if (imc >= 35 && imc < 39.9)
      return 'Obesidade grau 2';
    
    return 'Obesidade grau 3';

  }

  private adicionarHistorico(novoRegistro: imc) {
    const registrosAtuais = this.recordsSubject.getValue();
    registrosAtuais.push(novoRegistro);
    this.recordsSubject.next(registrosAtuais);
    this.salvarHistorico(registrosAtuais);
  }

  private salvarHistorico(registros: imc[]) {
    localStorage.setItem(this.imcStorageKey, JSON.stringify(registros));
    this.recordsSubject.next(registros);
  }

  private loadRecords(): imc[] {
    const registros = localStorage.getItem(this.imcStorageKey);
    return registros ? JSON.parse(registros) : [];
  }

  private clearAllHistory() {
    localStorage.removeItem(this.imcStorageKey);
    this.recordsSubject.next([]);
  }
}
