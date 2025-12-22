import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegistroComponent } from './vehicle-registro.component';

describe('VehicleRegistroComponent', () => {
  let component: VehicleRegistroComponent;
  let fixture: ComponentFixture<VehicleRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
