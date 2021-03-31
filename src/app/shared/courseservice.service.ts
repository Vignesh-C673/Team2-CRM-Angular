import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseserviceService {

  constructor(private httpClient: HttpClient) { }

  //get all list 
  getAllCourseMang(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/courses");
  }

  //insert course details
  insertCourse(course: Course): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "/api/courses/add", course);
  }

  //update course details
  updateCourse(course: Course): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/courses/update", course);
  }

  //to get all valid qualifications
  getAllQual(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/quals");
  }

  //to get all valid modules
  getAllModules(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/modules");
  }

  disableCourse(course: Course): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/courses/disable/" + course.coursecode, course);
  }

  enableCourse(course: Course): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/courses/enable/" + course.coursecode, course);
  }
}
