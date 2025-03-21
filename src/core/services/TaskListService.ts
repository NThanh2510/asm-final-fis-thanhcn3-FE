import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class TaskListService{

    private taskListApi = "http://localhost:8085/engine-rest/task";

    constructor( private http: HttpClient){}
    getTaskList(): Observable<any> {
        return this.http.get<any>(this.taskListApi);
      }
}