import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  username:any;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.username=localStorage.getItem("fname");

    if (localStorage.getItem("loggedin") == '1') {
      console.log("Reached If");
    }else{
      console.log("Reached else");
      this.router.navigateByUrl('/login');
    }
    }

    onClick() {
      localStorage.clear();
    }

}
