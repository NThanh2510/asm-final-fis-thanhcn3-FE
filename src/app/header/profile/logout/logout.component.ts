import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/core/services/UserService';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router
  ){}

  logout(){
    this.userService.logOut().subscribe(res => console.log(res))
    this.router.navigate(['/dashboard'])
    this.userService.removeToken()
  }

  ngOnInit(): void {
    this.logout()
  }

}
