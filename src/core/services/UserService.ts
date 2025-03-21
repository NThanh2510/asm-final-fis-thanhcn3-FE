import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser = 'http://localhost:8085/api/v1/admin';
 private apiOtp = 'http://localhost:8085/api/v1/otp'
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUser}/login`, body).pipe(
      map((response) => {
        if (response.result.accessToken) {
          const token = response.result.accessToken;
          this.setToken(token);
          return response;
        }
      })
    );
    setTimeout(() => {
      localStorage.removeItem('accessToken');
    }, 9000000);
  }

  register(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const body = { username, password, email, firstName, lastName };
    return this.http.post<any>(`${this.apiUser}/register`, body);
  }

  logOut() {
    return this.http.post<any>(`${this.apiUser}/logout`, {})
  }

  getListUser() {
    return this.http.get<any>(`${this.apiUser}/user-in-session`, {});
  }

  getListUsers() {
    return this.http.get<any>(`${this.apiUser}/users`, {});
  }

  getUserDetail(id: string) {
    return this.http.get<any>(`${this.apiUser}/user/${id}`);
  }

  getUserByRoleName(role: string) {
    return this.http.get<any>(`${this.apiUser}/users/${role}`);
  }

  setRole(kcid: string, role: string) {
    // console.log(kcid, role)
    return this.http.post<any>(`${this.apiUser}/set-role/${kcid}/${role}`, {});
  }
  removeRole(kcid: string, role: string) {
    // console.log(kcid, role)
    return this.http.post<any>(
      `${this.apiUser}/remove-role/${kcid}/${role}`,
      {}
    );
  }

  sendMail(email: any){
    return this.http.post<any>(`${this.apiOtp}/send/${email}`, {})
  }

  verifyOtp(email: any, otp: any){
    return this.http.post<any>(`${this.apiOtp}/verify/${email}/${otp}`, {})
  }

  changePassword(
    email: string,
    newPassword: string
  ){
    const body = { email, newPassword};
    console.log(body);
    return this.http.put<any>(`${this.apiUser}/change-password`, body)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken') || '';
  }

  removeToken(): void {
    localStorage.removeItem('accessToken');
  }
}
