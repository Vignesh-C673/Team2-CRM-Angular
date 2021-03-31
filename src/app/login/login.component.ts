import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser?: User;
  fname?: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    //create reactive form

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });
  }

  //get control for validation
  get formControls() {
    return this.loginForm.controls;
  }

  //login verify
  loginCredential() {
    console.log("inside login");
    
    this.isSubmitted = true;

    //form invalid
    if (this.loginForm.invalid) {
      console.log("invalid");
      return;
    }

    //form isvalid
    if (this.loginForm.valid) {
      console.log("valid");
      //calling methode from web service
      this.authService.loginVerify(this.loginForm.value).subscribe(data => {
        console.log(data);
        console.log(data.active);

        if (data.active === true) {
          //checking rolebased authentication
          if (data.role.role_id === 0) {
            console.log("success");
            localStorage.setItem("loggedin", '1');
            localStorage.setItem("fname", data.username);
            sessionStorage.setItem("fname", data.username);

            localStorage.setItem("ACCESS_ROLE", data.role.role_id.toString());
            this.router.navigateByUrl('/admin');
          } else if (data.role.role_id === 1) {
            console.log("success");
            localStorage.setItem("loggedin", '1');
            localStorage.setItem("fname", data.username);
            sessionStorage.setItem("fname", data.username);
            localStorage.setItem("ACCESS_ROLE", data.role.role_id.toString());
            this.router.navigateByUrl('/manager');
          } else if (data.role.role_id === 2) {
            console.log("success");
            localStorage.setItem("loggedin", '1');
            localStorage.setItem("fname", data.username);
            sessionStorage.setItem("fname", data.username);
            localStorage.setItem("ACCESS_ROLE", data.role.role_id.toString());
            this.router.navigateByUrl('/coordinator');
          }
          else {
            this.error = "Sorry ... This role is not allowed in this system"
          }
        }
      },
        error => {
          this.error = "Invalid username and password"
        });

    }

  }

}
