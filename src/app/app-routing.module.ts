import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { CourseComponent } from './course/course.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AuthGuard } from './shared/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: '0' } },
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard], data: { role: '1' } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: '0' } },
  { path: 'enquiry', component: EnquiryComponent, canActivate: [AuthGuard], data: { role: '2' } },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard], data: { role: '0' } },
  { path: 'report', component: PieChartComponent, canActivate: [AuthGuard], data: { role: '1' } },
  { path: 'coordinator', component: CoordinatorComponent, canActivate: [AuthGuard], data: { role: '2' } }
  // {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
