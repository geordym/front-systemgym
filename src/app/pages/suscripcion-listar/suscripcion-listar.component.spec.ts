import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionListarComponent } from './suscripcion-listar.component';

describe('SuscripcionListarComponent', () => {
  let component: SuscripcionListarComponent;
  let fixture: ComponentFixture<SuscripcionListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuscripcionListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuscripcionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
