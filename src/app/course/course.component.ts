import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../shared/course';
import { CourseserviceService } from '../shared/courseservice.service';
import { Module } from '../shared/module';
import { Qualification } from '../shared/qualification';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  isSubmitted:boolean=false;
  courseDetails!: Course[];
  course!: Course;
  allModules!: Module[];
  allQuals!: Qualification[];

  closeResult = '';
  editForm!: FormGroup;
  allCourses!: Course[];

  page: number = 1;
  filter: any;

  coursename?:any;


  constructor(private courseService: CourseserviceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    // private validators:Validators
  ) {

    //Populate Form
    
  }

  ngOnInit(): void {
    console.log("initialised");
    this.getAllCourses();
    this.getAllModules();
    this.getAllQuals();
    this.courseForm();

  }
  /***************************************************************************** */
  pushModules() {
    this.allModules.forEach(element => {
      this.modules.push(this.fb.control(''));
    });
  }

  //*********************************************************************** */
  pushQuals() {
    this.allQuals.forEach(element => {
      this.quals.push(this.fb.control(''));
    });
  }
  /***************************************************************************** */

  get modules() {
    return this.editForm.get('modules') as FormArray;
  }
  /***************************************************************************** */

  get quals() {
    return this.editForm.get('qualifications') as FormArray;
  }

  getAllModules() {
    this.courseService.getAllModules().subscribe(
      (response) => {
        this.allModules = response;
        this.pushModules();
      }

    );
  }

  getAllQuals() {
    this.courseService.getAllQual().subscribe(
      (response) => {
        this.allQuals = response;
        this.pushQuals();
      }

    );
  }
  //get all courses
  getAllCourses() {
    this.courseService.getAllCourseMang().subscribe(
      (response) => {
        this.courseDetails = response;
        this.allCourses = response;
        console.log(response);
      }

    );
  }

  //open form 
  open(content: any) {
    this.editForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with:${result}`;

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });
  }
  //get dismissREason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `width:${reason}`;
    }

  }

  onSubmit() {
    this.isSubmitted=true;
    
    if(this.editForm.invalid){
      console.log("invalid")
      return;
    }
    let course: Course = new Course(0);

    course.coursename = this.editForm.value['coursename'];
    course.description = this.editForm.value['description'];
    course.duration = this.editForm.value['duration'];
    course.fees = this.editForm.value['fees'];
    course.active = true;

    this.editForm.value['qualifications'].forEach((element: boolean, i: number) => {
      if (element === true) {
        course.qualifications.push(new Qualification(i + 1));
      }
    });

    this.editForm.value['modules'].forEach((element: boolean, i: number) => {
      if (element === true) {
        course.modules.push(new Module(i + 1));
      }
    });

    console.log("Inserting");
    console.log(course);

    //Inserting record
    this.courseService.insertCourse(course).subscribe(

      (result) => {
        console.log(result);
        //reload
        this.ngOnInit();
      });

    this.modalService.dismissAll();
    this.toastr.success('Record has been inserted');

  }

  //open edit form for data
  openEdit(targetModal: any, course: Course) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: '1g'
    })

    let boolmodules: boolean[] = [];  //**************************************
    let boolquals: boolean[] = [];

    this.allModules.forEach(element => {
      boolmodules.push(false);
    });

    course.modules.forEach(element => {
      boolmodules[element.modid - 1] = true;
    });

    this.allQuals.forEach(element => {
      boolquals.push(false);
    });

    course.qualifications.forEach(element => {
      boolquals[element.qualid - 1] = true;
    });

    this.editForm.patchValue({
      coursecode: course.coursecode,
      coursename: course.coursename,
      description: course.description,
      duration: course.duration,
      fees: course.fees,
      active: course.active,
      modules: boolmodules,
      qualifications: boolquals
    });
  }

  //Upadate
  onUpdate() {
    this.isSubmitted=true;

    if(this.editForm.invalid){
      console.log("invalid")
      return;
    }

    let course: Course = new Course(0);

    course.coursecode = this.editForm.value['coursecode'];
    course.coursename = this.editForm.value['coursename'];
    course.description = this.editForm.value['description'];
    course.duration = this.editForm.value['duration'];
    course.fees = this.editForm.value['fees'];
    course.active = this.editForm.value['active'];

    this.editForm.value['qualifications'].forEach((element: boolean, i: number) => {
      if (element === true) {
        console.log("there is value in checkbox" + i + ":" + element);
        course.qualifications.push(new Qualification(i + 1));
      }
    });

    this.editForm.value['modules'].forEach((element: boolean, i: number) => {
      if (element === true) {
        console.log("there is value in checkbox" + i + ":" + element);
        course.modules.push(new Module(i + 1));
      }
    });
    //Assigning values from editform to modal
    console.log(course);

    //call service for update
    this.courseService.updateCourse(course).subscribe(
      (result) => {
        console.log(result);
        //reload
        this.ngOnInit();
      });
    this.modalService.dismissAll();
    this.toastr.success('Record Has Been Updated')

  }


  onDisable(course: Course) {
    this.editForm.patchValue({
      coursecode: course.coursecode
    });
    //call the service for disable
    this.courseService.disableCourse(course).subscribe(
      (result) => {
        console.log(result);
        //reload the page
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll();
  }

  onEnable(course: Course) {
    this.editForm.patchValue({
      coursecode: course.coursecode
    });
    //call the service for enable
    this.courseService.enableCourse(course).subscribe(
      (result) => {
        console.log(result);
        //reload the page
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll();
  }

  get formControls(){
    return this.editForm.controls;
  }

  courseForm(){
    this.editForm = this.fb.group(
      {
        coursecode: [''],
        coursename: ['',[Validators.required]],
        description: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        duration: ['',[Validators.required, Validators.pattern('[0-9]*')]],
        fees: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        active: [''],
        modules: this.fb.array([

        ]),
        qualifications: this.fb.array([

        ])

      }
    );
  }

  search(){
    if(this.coursename==""){
        console.log("empty");
        this.ngOnInit();
    }
    else{
      this.courseDetails=this.courseDetails.filter(res=>{
        return res.coursename!.toLocaleLowerCase().match(this.coursename.toLocaleLowerCase());
      })
    }
  }

}
