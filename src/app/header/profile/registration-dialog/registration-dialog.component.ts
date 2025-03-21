import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/core/services/LoadingService';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
})
export class RegistrationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userSerive: UserService,
    private loadingService: LoadingService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted = false;
  Message: string = '';

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.Message = '';
    this.errorMessage = '';
    this.loadingService.sleepLoading(true)
    this.submitted = true;
    if (this.registerForm.valid) {
      const { username, password, email, firstName, lastName } = this.registerForm.value;
      this.userSerive.register(username, password, email, firstName, lastName)
        .pipe(finalize(() => this.loadingService.sleepLoading(false)))
        .subscribe(
          (response) => {
            this.Message = response.message;
          },
          (error) => {
            this.errorMessage = error.error.message;
            console.error(error);
          }
        )
    } else {
      console.log('Form is invalid');
    }
  }
  close(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }
}
