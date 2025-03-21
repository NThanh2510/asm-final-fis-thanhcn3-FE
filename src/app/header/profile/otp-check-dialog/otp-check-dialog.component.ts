import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/core/services/LoadingService';
import { UserService } from 'src/core/services/UserService';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-otp-check-dialog',
  templateUrl: './otp-check-dialog.component.html',
  styleUrls: ['./otp-check-dialog.component.scss']
})
export class OtpCheckDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OtpCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
  ) { }

  verify: boolean = false;
  otp: string[] = ['', '', '', '', '', ''];
  errorMessage: string = '';

  moveToNext(event: any, index: number): void {
    const value = event.target.value;
    if (value && index < this.otp.length - 1) {
      const nextInput = document.getElementsByClassName('otp-field')[index + 1] as HTMLInputElement;
      nextInput.focus();
    }
  }

  moveToPrevious(event: any, index: number): void {
    if (event.key === 'Backspace') {
      if (index > 0) {
        const currentInput = document.getElementsByClassName('otp-field')[index] as HTMLInputElement;
        currentInput.value = '';
        const prevInput = document.getElementsByClassName('otp-field')[index - 1] as HTMLInputElement;
        prevInput.focus();
      } else {
        const firstInput = document.getElementsByClassName('otp-field')[0] as HTMLInputElement;
        firstInput.focus();
      }
    }
  }

  submitOtp() {
    const otpString = this.otp.join('');
    const email = this.data
    this.userService.verifyOtp(email, otpString).pipe(finalize(() => this.loadingService.sleepLoading(false)))
      .subscribe((response) => {
        this.verify = response.result
        if (this.verify) {
          this.openChangePassword(email)
        } else {
          this.errorMessage = "Mã không chính xác"
          console.log("OTP khong chinh xac");
        }
      })
  }

  openChangePassword(email: string) {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '700px',
      data: email,
    });
  }
  close(): void {
    this.dialogRef.close();
  }

}
