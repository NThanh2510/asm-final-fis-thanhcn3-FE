import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/core/services/UserService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ){}
  
  canActivate(): boolean{
    if(this.userService.isLoggedIn()){
      localStorage.removeItem('hasReloaded');
      return true;
    } else {
      if (!localStorage.getItem('hasReloaded')) {
        localStorage.setItem('hasReloaded', 'true'); 
        location.reload(); 
      } else {
        localStorage.removeItem('hasReloaded'); 
      }
      return false;
    }
  }
  
}
