import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcChartComponent } from './imc-chart.component';

describe('ImcChartComponent', () => {
  let component: ImcChartComponent;
  let fixture: ComponentFixture<ImcChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
