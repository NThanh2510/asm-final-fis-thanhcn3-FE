import { Component, HostListener, Input, OnInit } from '@angular/core';
import { userItems } from './header-dummy-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  

   @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkCanShowSearchasOverlay(window.innerWidth)
    }

    userItems = userItems;

  canShowSearchasOverlay = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.checkCanShowSearchasOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchasOverlay(inerwidth: number): void{
    if(inerwidth < 885 ){
      this.canShowSearchasOverlay=true;
    } else {
      this.canShowSearchasOverlay=false;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }



}
