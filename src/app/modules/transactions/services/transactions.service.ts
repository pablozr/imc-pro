import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient)
  messageService = inject(MessageService)

  private apiUrl = 'http://localhost:8000/api/v1/transactions';
  private apiUrlCategory = 'http://localhost:8000/api/v1/categories'

  constructor() { }
  

  public getTransactions(date:Date): Promise<any | false>{
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return new Promise((resolve, _) => {this.http.get<any>(`${this.apiUrl}?mes=${month}&ano=${year}`).subscribe({
      next: (value) => {
          resolve(value);
      },
      error: (error: any) => {
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível carregar as transações.'});

        resolve(false);
      }
    })})
  }

  public addTransaction(transaction:any): Promise<any | false>{
    return new Promise((resolve, _) => {
      this.http.post<any>(this.apiUrl, transaction).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (err: any) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível criar a transação.'});
          resolve(false);
        }
      });
    })
  }

  public getCategories(): Promise<any | false>{
    return new Promise((resolve, _) => {
      this.http.get<any>(this.apiUrlCategory).subscribe({
        next: (value) => {
            resolve(value);
        },
        error: (err:any) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível retornar as categorias.'});
          resolve(false);
        }
      })
    })
  }

  public updateTransaction(transaction:any){
    if (!transaction.id) {
      return Promise.reject('ID da transação não fornecido para atualização.');
    }

    return new Promise((resolve, _) => {
      this.http.patch<any>(`${this.apiUrl}/${transaction.id}`, transaction).subscribe({
        next: (value) => {
            resolve(value);
        },
        error: (err:any) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível atualizar.'});
          resolve(false);
        },
      })
    })
  }

}
