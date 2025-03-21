import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private taskList = 'http://localhost:8085/engine-rest';
  private orderUrl = 'http://localhost:8085/api/v1/admin';
  
  constructor(private http: HttpClient) {}


  acceptTask(taskId: string, isApproved: boolean): Observable<any> {
    return this.http.post(`${this.orderUrl}/order/${taskId}/approve?isApproved=${isApproved}`, {})
  }
  payTask(taskId: string, isPay: boolean): Observable<any> {
    return this.http.post(`${this.orderUrl}/order/${taskId}/pay?isPay=${isPay}`, {})
  }

  orderList(): Observable<any> {
    return this.http.get<any>(`${this.orderUrl}/orders`);
  }

  getBPMNXml(){
    return this.http.get<any>(`${this.taskList}/process-definition/key/Process_0y5ut7e/xml`)
  }

}
