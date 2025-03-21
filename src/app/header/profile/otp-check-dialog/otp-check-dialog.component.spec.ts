import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCheckDialogComponent } from './otp-check-dialog.component';

describe('OtpCheckDialogComponent', () => {
  let component: OtpCheckDialogComponent;
  let fixture: ComponentFixture<OtpCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpCheckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
