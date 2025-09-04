import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ImcService } from '../../services/imc-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, ToastModule, FormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  messageService = inject(MessageService);
  imcService = inject(ImcService);

  peso: number | null = null;
  altura: number | null = null

  calcularImc() {
    if (this.peso !== null && this.altura !== null && this.peso > 0 && this.altura > 0) {
      const resultado = this.imcService.calcularIMC(this.peso, this.altura);
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: `Seu IMC é ${resultado.imc} (${resultado.classificacao})`});
      this.peso = null;
      this.altura = null;
    } else {
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Por favor, insira valores válidos para peso e altura.'});
    }
  }
}
