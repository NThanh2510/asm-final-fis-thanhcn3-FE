import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/UserService';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService){}

  
  // isForgotPassword: boolean = false;
  isLoggedIn: boolean = false;
  title = 'ADMIN_THANHCN3';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onLoginStatusChange(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }



  ngOnInit(): void {
  
    this.isLoggedIn = this.userService.isLoggedIn()
    console.log(this.isLoggedIn)
  }
}
