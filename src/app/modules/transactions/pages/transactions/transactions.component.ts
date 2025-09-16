import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../global/components/header/header.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TransactionService } from '../../services/transactions.service';
import { Observable } from 'rxjs';
import { T } from '@angular/router/router_module.d-6zbCxc1T';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CardModule, ButtonModule, CalendarModule, FormsModule, TableModule, CommonModule, HeaderComponent, DialogModule, InputTextModule, InputNumberModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionComponent {
  transactionService: TransactionService = inject(TransactionService);
 
  mesAnoSelecionado: Date = new Date();
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  newTransaction: any = {};
  transactions: any[] = [];
  categories: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.viewByPeriod()
    this.getCategories()
  }

  openEditModal(transaction:any){
    this.newTransaction = {...transaction}
    this.displayEditModal = true;
  }

  updateTransaction(){
    this.transactionService.updateTransaction(this.newTransaction).then((response: any) => {
      if(response && typeof(response) === 'object' && response.data){
        const index = this.transactions.findIndex(t => t.id === response.data.id);
        if(index !== -1){
          this.transactions[index] = response.data;
          this.displayEditModal = false;
          this.newTransaction = {};
        }
      }
    })
  }

  viewByPeriod(){
    this.transactionService.getTransactions(this.mesAnoSelecionado).then((response) => {
      if(response && typeof(response) === 'object'){
        this.transactions = response.data
      }else{
        this.transactions = []
      }
    })
  }

  getCategories(){
    this.transactionService.getCategories().then((response) => {
    if(response && typeof(response) === 'object'){
      this.categories = response.data
    }  
    })
  }

  addTransaction(){
    this.transactionService.addTransaction(this.newTransaction).then((response) => {
      if(response && typeof(response) === 'object'){
        this.transactions = [...this.transactions,response]
        this.displayAddModal = false
        this.newTransaction ={}
      }
    })
  }


  showAddModalDialog() {
    this.displayAddModal = true;
  }

}
