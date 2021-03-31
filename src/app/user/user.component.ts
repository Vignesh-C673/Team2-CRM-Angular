import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { post } from 'selenium-webdriver/http';
import { Roledetails } from '../shared/roledetails';
// import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  user = User;
  closeResult!: string;
  editForm!: FormGroup;
  page: number = 1;
  roles: Roledetails[] = [];
  // role=Roledetails;

isSubmitted=false;

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder
    // private toastr: ToastrService
  ) { }



  ngOnInit(): void {

    this.getUsers();
    this.getAllRoles();
    //populating form
    this.editForm = this.fb.group(
      {
        user_id: [''],
        username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        password: ['', [Validators.required]],
        firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        address: ['', [Validators.required]],
        role_id: [''],
        active: [''],
        role: [''],
        roleid:['']


      }
    );
  }

  get formControls() {
    return this.editForm.controls;
  }


  //GET all user
  getUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        console.log(response);
        this.users = response

      }
    );
  }

  //  //Open Modal form
  open(content: any) {
    this.editForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });

  }

  // //Get dismissReason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //  //form submit
  onSubmit() {
    this.isSubmitted=true;

    if(this.editForm.invalid){
      console.log("invalid")
      return;
    }
    //this.insertRecord(f);
    //Write a code for inserting a record
    console.log("Inserting");
    console.log(this.editForm.value);

    let user: User = new User();

    // user=this.editForm.value;
    user.username = this.editForm.value['username'];
    user.password = this.editForm.value['password'];
    user.firstname = this.editForm.value['firstname'];
    user.lastname = this.editForm.value['lastname'];
    user.address = this.editForm.value['address'];
    user.email = this.editForm.value['email'];
    user.active = true;
    user.role = new Roledetails(this.editForm.value['role']);

    // console.log("user");
    console.log(user);
    //Inserting a record by API
    this.userService.insertUser(user).subscribe(
      (result) => {
        console.log(result);
        //reload the view again
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll();
    // this.toastr.success('record has been inserted','EmpApp v2021');

  }

  //Open add form populating employee data
  openEdit(targetModal: any, user: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    })
    this.editForm.patchValue({
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      username: user.username,
      roleid: user.role.role_id,
      active: user.active,
      role: user.role
    });

  }

  //Update
  onUpdate() {
    //Assigning values from editform to modal
    let user: User = new User
    user = this.editForm.value;
    console.log(user);

    //call service for update
    this.userService.updateUser(user).subscribe(
      (result) => {
        console.log(result);
        //reload
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }


  //DELETE
  onDelete(user: User) {
    //Assigning values from editform to modal
    this.editForm.patchValue({
      user_id: user.user_id
    });


    // //call service for update
    this.userService.disableUser(user).subscribe(
      (result) => {
        console.log(result);
        //reload
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  //enable user
  onEnable(user: User) {
    this.editForm.patchValue({
      user_id: user.user_id
    });
    //call service for update
    this.userService.enableUser(user).subscribe(
      (result) => {
        console.log(result);
        //relod
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  //get all roles
  getAllRoles() {
    this.userService.allRoles().subscribe(
      (response) => {
        console.log(response);
        this.roles = response

      }
    );
  }
}
