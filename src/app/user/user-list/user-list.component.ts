import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, forkJoin, map } from 'rxjs';
import { LoadingService } from 'src/core/services/LoadingService';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  page: number = 1;
  pageSize: number = 10;
  listUser: any[] = [];

  getAllUser() {
    return this.userService.getListUser().pipe(
      map((response) => {
        return response.result.sort((a: { online: boolean }, b: { online: boolean }) => Number(b.online) - Number(a.online));
      }) 
    );
  }


  goToDetail(id: string) {
    this.router.navigate(['/user/detail/', id])
  }

  ngOnInit(): void {
    this.loadingService.sleepLoading(true)
    forkJoin({
      listUser: this.getAllUser()
    }).pipe(
      finalize(() => this.loadingService.sleepLoading(false))
    ).subscribe({
      next: ({ listUser }) => {
        this.listUser = listUser
      },
      error: (err) => {
        console.log("Loi khi loading data", err);
        
      }
    })

    // this.getAllUser()
  }

}
