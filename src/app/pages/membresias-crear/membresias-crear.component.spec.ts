import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiasCrearComponent } from './membresias-crear.component';

describe('MembresiasCrearComponent', () => {
  let component: MembresiasCrearComponent;
  let fixture: ComponentFixture<MembresiasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembresiasCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembresiasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
