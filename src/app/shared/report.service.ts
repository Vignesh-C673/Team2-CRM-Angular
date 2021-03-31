import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  //to get all status count
  getStatusCount():Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/status/count");
  }

  //to get all label
  getStatusLabel():Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/status");
  }
}
