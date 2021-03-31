import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router: Router) { }

  //verify Login
  public loginVerify(user: User){
    console.log(user.username);
    console.log(user.password);
    //calling webservice and passing username and password
    return this.httpClient.get<User>(environment.apiUrl + "/api/user-login/" + user.username + "&" + user.password);
  }
}
