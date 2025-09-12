import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ImcService } from '../../services/imc/imc-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, ToastModule, FormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  imcService = inject(ImcService);
  private router = inject(Router);

  peso: number | null = null;
  altura: number | null = null

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  calcularImc() {
      const resultado = this.imcService.calcularIMC(this.peso, this.altura);
      this.peso = null;
      this.altura = null;
  }
}
