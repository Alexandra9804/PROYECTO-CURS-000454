import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListadoComponent } from './vehicle-listado.component';

describe('VehicleListadoComponent', () => {
  let component: VehicleListadoComponent;
  let fixture: ComponentFixture<VehicleListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
