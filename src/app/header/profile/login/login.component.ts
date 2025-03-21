import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/core/services/UserService';
import { OtpCheckDialogComponent } from '../otp-check-dialog/otp-check-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/core/services/LoadingService';
import { finalize, pipe } from 'rxjs';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  @Output() loginClicked = new EventEmitter<void>();
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  errorMessage: string | null = null;
  isForgotPassword = false;
  code: number = 0;

  get f() {
    return this.forgotPasswordForm.controls;
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.userService.login(username, password).subscribe(
      (response) => {
        console.log('dang nhap thanh cong', response);
        window.location.reload();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.error('Lỗi đăng nhập', this.errorMessage);
      }
    );
  }

  sendMail() {
    const form = this.forgotPasswordForm.value;
    console.log(form.email);
    this.sleepLoading(true);
    this.userService
      .sendMail(form.email)
      .pipe(finalize(() => this.sleepLoading(false)))
      .subscribe(
        (response) => {
          console.log(response);
          this.code = response.code;
          this.openOtp(form.email)
        },
        (error) => {
          this.errorMessage = error.error.message;
          console.error(error);
        }
      );
  }

  openOtp(email: string) {
    this.dialog.open(OtpCheckDialogComponent, {
      width: '700px',
      data: email,
    });
  }

  openRegister() {
    this.dialog.open(RegistrationDialogComponent),
    {
      fullscreen: true,
    };
  }

  changeIsForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
    this.errorMessage = '';
  }

  sleepLoading(load: boolean): void {
    if (load) {
      this.loadingService.showLoading();
    } else {
      this.loadingService.hideLoading();
    }
  }

  ngOnInit(): void { }
}
