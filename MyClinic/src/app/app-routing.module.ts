import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {
    path:'manage',
    loadChildren:()=>import('./features/manage-patient/manage-patient.module').then((m)=>m.ManagePatientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
