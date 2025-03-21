import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.changePassForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
      { validator: this.passwordsMatch });
  }

  changePassForm!: FormGroup;

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const newPass = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    if (newPass && confirmPassword && newPass.value !== confirmPassword.value) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.changePassForm.valid) {
      const { newPassword } = this.changePassForm.value;
      console.log('pass', newPassword);
      console.log(this.data);
      this.userService.changePassword(this.data, newPassword).subscribe(
        (response) => {
          // console.log(response);
          window.location.reload();
        });
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnInit(): void { }
}
