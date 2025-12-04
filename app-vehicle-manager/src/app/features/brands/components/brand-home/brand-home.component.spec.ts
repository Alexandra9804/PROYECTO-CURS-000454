import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandHomeComponent } from './brand-home.component';

describe('BrandHomeComponent', () => {
  let component: BrandHomeComponent;
  let fixture: ComponentFixture<BrandHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
