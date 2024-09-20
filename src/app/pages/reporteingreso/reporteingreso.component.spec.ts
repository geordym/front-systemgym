import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteingresoComponent } from './reporteingreso.component';

describe('ReporteingresoComponent', () => {
  let component: ReporteingresoComponent;
  let fixture: ComponentFixture<ReporteingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
