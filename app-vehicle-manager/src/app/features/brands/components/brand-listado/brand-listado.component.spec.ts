import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListadoComponent } from './brand-listado.component';

describe('BrandListadoComponent', () => {
  let component: BrandListadoComponent;
  let fixture: ComponentFixture<BrandListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
