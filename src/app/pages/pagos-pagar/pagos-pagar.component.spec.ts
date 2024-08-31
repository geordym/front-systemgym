import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPagarComponent } from './pagos-pagar.component';

describe('PagosPagarComponent', () => {
  let component: PagosPagarComponent;
  let fixture: ComponentFixture<PagosPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagosPagarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagosPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
