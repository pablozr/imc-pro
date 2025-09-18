import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IGetBalanceResponse, IGetTransactionsResponse, IOneTransactionResponse, ITransactions } from '../interfaces/ITransactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient)
  messageService = inject(MessageService)

  private apiUrl = 'http://localhost:8000/api/v1/transactions';
  private apiUrlCategory = 'http://localhost:8000/api/v1/categories'

  constructor() { }
  

  public getTransactions(date:Date): Promise<IGetTransactionsResponse | false>{
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return new Promise((resolve, _) => {
      this.http.get<IGetTransactionsResponse>(`${this.apiUrl}?mes=${month}&ano=${year}`).subscribe({
        next: (value) => {
            resolve(value);
        },
        error: (error: any) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível carregar as transações.'});

          resolve(false);
        }
      })
    })
  }

  public addTransaction(transaction:ITransactions): Promise<IOneTransactionResponse | false>{
    return new Promise((resolve, _) => {
      this.http.post<IOneTransactionResponse >(this.apiUrl, transaction).subscribe({
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

  public getBalance(date:Date): Promise<IGetBalanceResponse | false>{
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return new Promise((resolve, _) => {
    this.http.get<IGetBalanceResponse>(`${this.apiUrl}/balance?mes=${month}&ano=${year}`).subscribe({
      next: (value) => {
          resolve(value);
      },
      error: (err:any) => {
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível pegar o saldo.'});
        resolve(false);
      }
    })
    })
  }

  public updateTransaction(transaction:ITransactions): Promise<IOneTransactionResponse | false>{
    if (!transaction.id) {
      return Promise.reject('ID da transação não fornecido para atualização.');
    }

    return new Promise((resolve, _) => {
      this.http.patch<IOneTransactionResponse>(`${this.apiUrl}/${transaction.id}`, transaction).subscribe({
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

  public deleteTransaction(transaction:ITransactions): Promise<any | false>{
    if (!transaction.id) {
      return Promise.reject('ID da transação não fornecido para deletar.');
    }

    return new Promise((resolve, _) => {
      this.http.delete<any>(`${this.apiUrl}/${transaction.id}`).subscribe({
        next: (value) => {
            resolve(value);
        },
        error: (err:any) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível deletar.'});
          resolve(false);
        },
      })
    })
  }

}
