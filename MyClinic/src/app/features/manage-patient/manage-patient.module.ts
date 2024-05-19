import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePatientRoutingModule } from './manage-patient-routing.module';
import { ListPatientComponent } from './patient/listPatient/listPatient.component';
import { AddPatientComponent } from './patient/addPatient/addPatient.component';
import { EditPatientComponent } from './patient/editPatient/editPatient.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { PatientService } from '../services/patient.service';
import { RendezVousService } from '../services/rendez-vous.service';
import { AnimateModule } from 'primeng/animate';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAppointmentComponent } from './appointment/listAppointment/listAppointment.component';
import { AddAppointmentComponent } from './appointment/addAppointment/addAppointment.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { EditAppointmentComponent } from './appointment/editAppointment/editAppointment.component';
import { StatusPipePipe } from 'src/app/core/pipes/StatusPipe.pipe';
import { ListConsultationComponent } from './consultation/ListConsultation/ListConsultation.component';
import { EditConsultationComponent } from './consultation/EditConsultation/EditConsultation.component';
import { ListOrdonnanceComponent } from './ordonnance/ListOrdonnance/ListOrdonnance.component';
import { AddOrdonnanceComponent } from './ordonnance/addOrdonnance/addOrdonnance.component';

@NgModule({
  declarations: [
    ListPatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListAppointmentComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    StatusPipePipe,
    ListConsultationComponent,
    EditConsultationComponent,
    ListOrdonnanceComponent,
    AddOrdonnanceComponent
  ],
  imports: [
    CommonModule,
    ManagePatientRoutingModule,
    TableModule,
    MultiSelectModule,
    TreeTableModule,
    TreeModule,
    ButtonModule,
    TreeSelectModule,
    AnimateModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,

  ],
  providers:[PatientService,RendezVousService]
})
export class ManagePatientModule { }
