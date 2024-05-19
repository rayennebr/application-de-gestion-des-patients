import { Component, OnInit } from '@angular/core';
import { RendezVous } from '../../../models/rendez-vous';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { ApiResponse } from '../../../shared/api-response';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';

@Component({
  selector: 'app-listPatient',
  templateUrl: './listPatient.component.html',
  styleUrls: ['./listPatient.component.css']
})
export class ListPatientComponent implements OnInit {

  patient$: Patient[]=[];
  currentRendezVous$:RendezVous[]=[];
  public patient!:Patient;
  public view:boolean=false;
  public currentDate = new Date();
  public Date:any;
  public currentRdv!:RendezVous;

  constructor(public patientService:PatientService,
    public rdvService:RendezVousService,
    public router:Router,
    private sharedDataService:SharedDataService,) {}

  ngOnInit() {
    this.getAllPatient()
  }

  getAllPatient()
  {
    this.patientService.getAllPatient().subscribe((res:ApiResponse<Patient>) => {
        this.patient$=res.data.map((item:Patient )=>Patient.fromJson(item))
    });
  }

  getPatient(item:any)
  {
    console.log('%cpatient.component.ts line:31 item', 'color: #007acc;', item);
    this.view=true;
    this.patient=item;
  }
  ValiderRendezVous(event:any,item:any)
  {}

  editPatient(item:any){
    this.sharedDataService.setPatient(item);
  }


}
