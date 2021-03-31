import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Roledetails } from './roledetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //dependency injection
  constructor(private httpClient:HttpClient) { }


  //get all list
  getAllUsers(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+"/api/tusers");
  }


   //Insert
   insertUser(user:User):Observable<any>{
    return this.httpClient.post(environment.apiUrl+ "/api/tusers/add",user);

  }

  //Update
  updateUser(user:User):Observable<any>{
    return this.httpClient.put(environment.apiUrl+ "/api/tusers/{id}/update",user);

  }

  // //delete
  disableUser(user:User):Observable<any>{
    return this.httpClient.put(environment.apiUrl+ "/api/tusers/disable/" + user.user_id, user);
  }

  //enable user
  enableUser(user:User):Observable<any>{
    return this.httpClient.put(environment.apiUrl+ "/api/tusers/enable/" + user.user_id, user);
  }

  //get roles
  allRoles():Observable<any>{
    return this.httpClient.get(environment.apiUrl+ "/api/trole/"); 
  }
}
