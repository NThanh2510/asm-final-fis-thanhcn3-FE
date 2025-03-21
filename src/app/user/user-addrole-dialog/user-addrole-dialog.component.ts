import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-user-addrole-dialog',
  templateUrl: './user-addrole-dialog.component.html',
  styleUrls: ['./user-addrole-dialog.component.scss']
})
export class UserAddroleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserAddroleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.roleForm = this.fb.group({
      role: [data.role || '', Validators.required] 
      
    });
  }

  roleForm!: FormGroup;
  roles = ['ADMIN', 'Staff', "None"];


  onSubmit() {
    if (this.roleForm.valid) {
      const role = this.roleForm.value.role;
      const kcid = this.data
      if(role === "None"){
        this.userService.removeRole(kcid , "ADMIN").subscribe(res => console.log(res));
        this.userService.removeRole(kcid , "Staff").subscribe(res => console.log(res))
      }if (role === "ADMIN") {
        this.userService.setRole(kcid, "ADMIN").subscribe(res => console.log(res));
        this.userService.removeRole(kcid , "Staff").subscribe(res => console.log(res))
      }if (role ==="Staff") {
        this.userService.setRole(kcid, "Staff").subscribe(res => console.log(res));
        this.userService.removeRole(kcid , "ADMIN").subscribe(res => console.log(res))
      }
      this.dialogRef.close(this.roleForm.value); 
    }
  }

  close() {
    this.dialogRef.close();
  }
}
