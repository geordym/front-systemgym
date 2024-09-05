import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresosCrearComponent } from './egresos-crear.component';

describe('EgresosCrearComponent', () => {
  let component: EgresosCrearComponent;
  let fixture: ComponentFixture<EgresosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EgresosCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EgresosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
