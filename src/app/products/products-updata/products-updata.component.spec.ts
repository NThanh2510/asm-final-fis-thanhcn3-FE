import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdataComponent } from './products-updata.component';

describe('ProductsUpdataComponent', () => {
  let component: ProductsUpdataComponent;
  let fixture: ComponentFixture<ProductsUpdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsUpdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsUpdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
