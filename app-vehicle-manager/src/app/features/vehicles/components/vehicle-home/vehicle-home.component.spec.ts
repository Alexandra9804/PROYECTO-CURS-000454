import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleHomeComponent } from './vehicle-home.component';

describe('VehicleHomeComponent', () => {
  let component: VehicleHomeComponent;
  let fixture: ComponentFixture<VehicleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
