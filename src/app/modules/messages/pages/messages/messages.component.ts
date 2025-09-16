import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessagesService } from '../../services/messages.service';
import { HeaderComponent } from '../../../global/components/header/header.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, CommonModule, FormsModule, HeaderComponent, DialogModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  msgService = inject(MessagesService);

  messages: any[] = [];
  newMessage: any = {username: '', content: '', timestamp: ''};
  displayDialog: boolean = false;

  ngOnInit() {
    this.msgService.getMessages().then((response) => {
      if (response && typeof(response) === 'object') {
        this.messages = response.data;
      }
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  addMessage() {
      if(!this.newMessage.username || !this.newMessage.content) {
        alert('Please enter both username and message content.');
        return;
      }

      this.newMessage.timestamp = new Date().toISOString();

      this.msgService.addMessage(this.newMessage).then((response) => {
        if (response && typeof(response) === 'object') {
          this.messages= [...this.messages, response.data];
          this.newMessage = {username: '', content: '', timestamp: ''};
          this.displayDialog = false;
        }
      });
    }
}
