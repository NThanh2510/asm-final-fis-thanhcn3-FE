import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private ProductApi = 'http://localhost:8085/api/v1/admin';
  constructor(private http: HttpClient) {}
  
  getProducts() {
    return this.http.get<any>(`${this.ProductApi}/products`);
  }
  getOptionsByProduct(id: number) {
    return this.http.get<any>(`${this.ProductApi}/product/${id}/option`);
  }

  addProduct(product: any): Observable<any>{
    return this.http.post<any>(`${this.ProductApi}/product/create`, product);
  }
  
  getAllCate(){
    return this.http.get<any>(`${this.ProductApi}/cate-all`)
  }

  getSubCateByCateId(id: string){
    return this.http.get<any>(`${this.ProductApi}/sub-cate/${id}`)
  }

  addOption(option: any){
    return this.http.post<any>(`${this.ProductApi}/option/create`, option)
  }
  
}
