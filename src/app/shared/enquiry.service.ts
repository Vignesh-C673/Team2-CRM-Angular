import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enquiry } from './enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpClient:HttpClient) { }

  //get all status
  getAllStatuses():Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/status");
  }

  //get all courses
  getAllCourses(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/courses");
  }
  
  //get all list
  getAllEnquiry(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/enquiry");
  }

  //insert
  insertEnquiry(enq:Enquiry): Observable<any>{
    console.log(enq);
    return this.httpClient.post(environment.apiUrl+"/api/enquiry/add",enq);
  }

  //update 
  updateEnquiry(enq:Enquiry): Observable<any>{
    console.log(enq);  
    return this.httpClient.put(environment.apiUrl+"/api/enquiry/update",enq);
  }
}
