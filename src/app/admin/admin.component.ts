import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
