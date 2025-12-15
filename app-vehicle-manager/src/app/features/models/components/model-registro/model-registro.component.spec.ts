import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegistroComponent } from './model-registro.component';

describe('ModelRegistroComponent', () => {
  let component: ModelRegistroComponent;
  let fixture: ComponentFixture<ModelRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
