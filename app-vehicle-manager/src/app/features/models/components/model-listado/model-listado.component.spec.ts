import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListadoComponent } from './model-listado.component';

describe('ModelListadoComponent', () => {
  let component: ModelListadoComponent;
  let fixture: ComponentFixture<ModelListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
