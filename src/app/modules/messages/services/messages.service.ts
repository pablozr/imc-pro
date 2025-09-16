import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  http = inject(HttpClient);
  messageService = inject(MessageService);

  private apiUrl = 'http://localhost:8000/api/v1/messages';

  constructor() { }

  getMessages() : Promise<any | false> {
    return new Promise((resolve, _) => {this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        resolve(data);
      },
      error: (error: any) => {
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível carregar as mensagens.'});
        resolve(false);
      }
    })});
  }

  addMessage(message:any): Promise<any | false> {
    return new Promise((resolve, _) => {this.http.post<any>(this.apiUrl, message).subscribe({
      next: (data) => {
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Mensagem enviada com sucesso.'});
        resolve(data);
      },
      error: (error: any) => {
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Não foi possível enviar a mensagem.'});
        resolve(false);
      }
    })});
  }
}
