
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../services/UserService';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    errorMessage: String = '';
    constructor(
        private userService: UserService,

    ){}
  hasReloaded: boolean = false;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.userService.getToken();
        
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 403 && (!localStorage.getItem('hasReloaded'))) {
                localStorage.setItem('hasReloaded', 'true'); 
                localStorage.setItem('ErrorMessage','Bạn không có quyền truy cập')
                this.userService.removeToken()
                window.location.reload();
    
              }
              localStorage.removeItem('ErrorMessage')
              return throwError(() => error);
            })
          );
        }
      }