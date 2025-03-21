import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ReportService{

    private ReportApi = "http://localhost:8085/api/v1/admin/report";

    constructor( private http: HttpClient){}
    getRevenue(startDate: Date, endDate: Date): Observable<any> {
        const formattedStartDate = '2024-01-01'; // Giá trị cụ thể
        const formattedEndDate = '2024-12-31'; 
        const params = new HttpParams()
        .set('startDate', formattedStartDate)
        .set('endDate', formattedEndDate);
        return this.http.get<any>(`${this.ReportApi}/revenue`, { params });
      }

      getRevenueInDay(startDate: String, endDate: String): Observable<any> {
        const body = {
          startDate: startDate,
          endDate: endDate  
        };
        return this.http.post<any>(`${this.ReportApi}/revenue`, body);
      }

      getCountProductCategoryByDate(startDate: String, endDate: String): Observable<any> {
        const body = {
          startDate: startDate,
          endDate: endDate
        };
       
        return this.http.post<any>(`${this.ReportApi}/count-product-category-ByDate`,  body );
      }

      getCountCustomers(){
        return this.http.post<any>(`${this.ReportApi}/count-customers`,  null );
      }

      getMonthlyRevenue(){
        const body = {
          year: "2025"
        }
        return this.http.post<any>(`${this.ReportApi}/MonthlyRevenue`, body );
      }
}