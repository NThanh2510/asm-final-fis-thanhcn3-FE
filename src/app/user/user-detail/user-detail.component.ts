import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  dataUser: any = [];

  getUser(id: string) {
    this.userService.getUserDetail(id).subscribe((response) => {
      this.dataUser = response.result;
      console.log(this.dataUser);
    });
  }
  navigateToInvoices() {
    this.router.navigate(['/order/custom'], {
      queryParams: { kcid: this.dataUser.kcid },
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(id);
    }
  }
}
