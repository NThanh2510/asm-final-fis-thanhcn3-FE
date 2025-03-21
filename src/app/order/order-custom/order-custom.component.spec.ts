import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomComponent } from './order-custom.component';

describe('CoupenCustomComponent', () => {
  let component: OrderCustomComponent;
  let fixture: ComponentFixture<OrderCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
