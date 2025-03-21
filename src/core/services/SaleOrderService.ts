import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleOrderService {
  private OrderApi = 'http://localhost:8085/api/v1/admin';

  constructor(private http: HttpClient) {}
  getAllOrder() {
    return this.http.get<any>(`${this.OrderApi}/orders`);
  }

  getOrderByDetailByOrderId(id: number){
    return this.http.get<any>(`${this.OrderApi}/order-and-detail/${id}`)
  }

  getOrderByDetailByprocessId(processId: string){
    return this.http.get<any>(`${this.OrderApi}/order-and-detail-process/${processId}`)
  }

  getOrderByUser(kcid: string){
    return this.http.get<any>(`${this.OrderApi}/order-user/${kcid}`)
  }

  exportOrder(id: any){
    console.log(id)
    return this.http.get<any>(`${this.OrderApi}/report/export/bill/excel/${id}` )
  }

 

}
