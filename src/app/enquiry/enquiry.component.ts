import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../shared/course';
import { Enquiry } from '../shared/enquiry';
import { EnquiryService } from '../shared/enquiry.service';
import { Status } from '../shared/status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  isSubmitted:boolean=false;

  statuses!: Status[];
  enquiries!: Enquiry[];
  allcourses!: Course[];
  enquiry: Enquiry = new Enquiry;
  closeResult!: string;
  p: number = 1;
  filter!: string;
  addForm!: FormGroup;
  editForm!: FormGroup;

  constructor(private enquiryService: EnquiryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  //sorting
  key: string = 'enqName'; //set default
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit(): void {
    this.getEnquiries();
    this.getCourses();
    this.getStatus();
    this.newEnquiryForm();
    this.editEnquiryForm();
  }

  newEnquiryForm() {
    this.addForm = this.fb.group({
      enqid: [''],
      enqName: ['', [Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      address: ['', [Validators.required]],
      highestQual: ['', [Validators.required,Validators.pattern('[a-zA-Z]*')]],
      percent: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      yearOfPass: ['', [Validators.required, Validators.pattern('[0-9]*')]],

      enquiredCourse: this.fb.array([
      ])
    });
  }

  editEnquiryForm() {
    this.editForm = this.fb.group({
      enqid: [''],
      enqName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      highestQual: ['', [Validators.required]],
      percent: ['', [Validators.required]],
      yearOfPass: ['', [Validators.required]],
      enqDate:[''],
      enquiredCourse: this.fb.array([
      ]),
      status: ['']
    });

  }

  get formControls(){
    return this.addForm.controls;
  }

  // pushStatus() {
  //   this.statuses?.forEach(elememt => {
  //     this.statuss.push(this.fb.control(''));
  //   });
  // }

  pushCourses() {
    this.allcourses.forEach(element => {
      this.courses.push(this.fb.control(''));
    });
  }

  // get statuss() {
  //   return this.addForm.get('status') as FormArray;
  // }

  get courses() {
    return this.addForm.get('enquiredCourse') as FormArray;
  }

  getStatus() {
    this.enquiryService.getAllStatuses().subscribe(
      (response) => {
        this.statuses = response;
        // this.pushStatus();
      }
    )
  }

  getCourses() {
    this.enquiryService.getAllCourses().subscribe(
      (response) => {
        this.allcourses = response;
        this.pushCourses();
      });
  }

  getEnquiries() {
    this.enquiryService.getAllEnquiry().subscribe(response => {
      console.log(response);
      this.enquiries = response;
    });
  }

  //open form for 
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with:${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });
  }

  //get dismissReason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with:${reason}`;
    }
  }

  onSubmit() {
    this.isSubmitted=true;

    if(this.addForm.invalid){
      console.log("invalid")
      return;
    }

    let enquirry: Enquiry = new Enquiry();
    let date: Date = new Date();

    enquirry.enqName = this.addForm.value['enqName'];
    enquirry.address = this.addForm.value['address'];
    enquirry.email = this.addForm.value['email'];
    enquirry.mobile = this.addForm.value['mobile'];
    enquirry.highestQual = this.addForm.value['highestQual'];
    enquirry.percent = this.addForm.value['percent'];
    enquirry.yearOfPass = this.addForm.value['yearOfPass'];
    enquirry.status = new Status(1);
    enquirry.enqDate = date;
    this.addForm.value['enquiredCourse'].forEach((element: boolean, i: number) => {
      if (element === true) {
        enquirry.enquiredCourse.push(new Course(i + 1));
      }
    });
    console.log(enquirry);
    console.log("Inserting");

    //inserting record
    this.enquiryService.insertEnquiry(enquirry).subscribe(
      (result) => {
        console.log(result);
        //reload
        this.ngOnInit();
      });
    this.modalService.dismissAll();
    this.toastr.success('Enquiry has been inserted', 'CRMApp-V2021');
  }

  openEdit(targetModal: any, enquiry: Enquiry) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: '1g'
    });

    let boolcourses: boolean[] = [];
    let boolstatus: boolean[] = [];

    this.statuses.forEach(element => {
      boolstatus.push(false);
      console.log(boolstatus

      );
    });

    this.allcourses.forEach(element => {
      boolcourses.push(false);
      console.log(boolcourses);

    });

    // enquiry.status.forEach(element => {
    //   boolstatus[element.statusId - 1] = true;
    // });

    enquiry.enquiredCourse.forEach(element => {
      boolcourses[element.coursecode - 1] = true;
    });

    this.editForm.patchValue(
      {
        enqid: enquiry.enqid,
        enqName: enquiry.enqName,
        address: enquiry.address,
        email:enquiry.email,
        mobile:enquiry.mobile,
        highestQual:enquiry.highestQual,
        percent:enquiry.percent,
        yearOfPass:enquiry.yearOfPass,
        enqDate:enquiry.enqDate,
        enquiredCourse: boolcourses,
        status:enquiry.status.statusId
        
      });
    // this.editForm.patchValue({
    //   enqid: enquiry.enqid,
    //   enqName: enquiry.enqName,
    //   enquiredCourse: boolcourses,
    //   status: boolstatus
    // });
  }

  onSave() {
    this.enquiry = this.editForm.value;
    console.log( this.enquiry);
    this.enquiryService.updateEnquiry(this.enquiry).subscribe(
      (result) =>{
        console.log(result);
        //reload
        this.ngOnInit();
      });
      this.modalService.dismissAll();
      this.toastr.success('Enquiry has been Updated', 'CRMApp-V2021');
  }
}
