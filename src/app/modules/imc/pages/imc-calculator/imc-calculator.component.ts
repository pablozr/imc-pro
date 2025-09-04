import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { HeaderComponent } from '../../../global/components/header/header.component';

@Component({
  selector: 'app-imc-calculator',
  standalone: true,
  imports: [FormComponent, HeaderComponent],
  templateUrl: './imc-calculator.component.html',
  styleUrl: './imc-calculator.component.scss'
})
export class ImcCalculatorComponent {

}
