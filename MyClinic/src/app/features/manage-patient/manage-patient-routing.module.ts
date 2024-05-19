import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './patient/listPatient/listPatient.component';
import { AddPatientComponent } from './patient/addPatient/addPatient.component';
import { AddAppointmentComponent } from './appointment/addAppointment/addAppointment.component';
import { EditAppointmentComponent } from './appointment/editAppointment/editAppointment.component';
import { EditPatientComponent } from './patient/editPatient/editPatient.component';

const routes: Routes = [
  {path:'patient',component:ListPatientComponent},
  {path:'addPatient',component:AddPatientComponent},
  {path:'editPatient',component:EditPatientComponent},
  {path:'addAppoitment',component:AddAppointmentComponent},
  {path:'editAppoitment',component:EditAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePatientRoutingModule { }
