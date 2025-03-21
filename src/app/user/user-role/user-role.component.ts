import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/core/services/UserService';
import { UserAddroleDialogComponent } from '../user-addrole-dialog/user-addrole-dialog.component';
import { LoadingService } from 'src/core/services/LoadingService';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  listUser: any[] = [];
  role: string = '';
  page: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';
  searchTermGmail: string = '';
  filteredUser: any[] = [...this.listUser];

  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRole = selectElement.value;
    this.getAllUserByRole(selectedRole);
    this.sleep()
  }

  getAllUserByRole(role: string) {
    if (role === '') {
      this.userService.getListUsers().subscribe((response) => {
        this.listUser = response.result;
        console.log(this.listUser);
      });
    } else {
      this.userService.getUserByRoleName(role).subscribe((response) => {
        this.listUser = response.result;
        console.log(this.listUser);
      });
    }
  }

  // getAllUserByRole(role: string) {
  //   this.loadingService.sleepLoading(true); // ✅ Hiển thị loading
  
  //   forkJoin({
  //     users: this.userService.getListUsers(),
  //     filteredUsers: this.userService.getUserByRoleName(role) 
  //   })
  //   .pipe(finalize(() => this.loadingService.sleepLoading(false))) 
  //   .subscribe({
  //     next: ({ users, filteredUsers }) => {
  //       this.listUser = role === '' ? users.result : filteredUsers.result; 
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi gọi API:', err);
  //     }
  //   });
  // }

  onSearch() {
    const searchTerm = this.searchTerm?.trim().toLowerCase();
    
    if (searchTerm !== '') {
      this.filteredUser = this.listUser.filter((user) => {
        const username = user.username ? user.username.toLowerCase() : '';
        const userName = user.userName ? user.userName.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
  
        return username.includes(searchTerm) || userName.includes(searchTerm) || email.includes(searchTerm);
      });
    } else {
      this.filteredUser = [...this.listUser];
    }
  }

  openDialog(kcid: string) {
    const dialogRef = this.dialog.open(UserAddroleDialogComponent, {
      width: '400px',
      data: kcid,   
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  async sleep() {
    await this.loadingService.sleep(400);
  }

  ngOnInit(): void {
    this.getAllUserByRole(this.role);
    this.sleep()
  }
}
