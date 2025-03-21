import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddroleDialogComponent } from './user-addrole-dialog.component';

describe('UserAddroleDialogComponent', () => {
  let component: UserAddroleDialogComponent;
  let fixture: ComponentFixture<UserAddroleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddroleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddroleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
