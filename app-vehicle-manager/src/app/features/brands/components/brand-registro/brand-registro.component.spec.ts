import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRegistroComponent } from './brand-registro.component';

describe('BrandRegistroComponent', () => {
  let component: BrandRegistroComponent;
  let fixture: ComponentFixture<BrandRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
