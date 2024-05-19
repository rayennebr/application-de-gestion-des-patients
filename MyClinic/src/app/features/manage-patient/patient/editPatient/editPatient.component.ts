import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/features/models/patient';
import { PatientService } from 'src/app/features/services/patient.service';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';

@Component({
  selector: 'app-editPatient',
  templateUrl: './editPatient.component.html',
  styleUrls: ['./editPatient.component.css'],
  providers: [DatePipe]
})
export class EditPatientComponent implements OnInit {
  public editForm!:FormGroup;
  submitted = false;
  public patient!:Patient;
  public sexeH=false;
  public sexeF=false;
  public situationM=false;
  public situationC=false;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    public patientService:PatientService,
    private sharedDataService:SharedDataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.patient=this.sharedDataService.getPatient();
    if(this.patient.sexe=='H')
    {
      this.sexeH=true;
    }else{
      this.sexeF=true
    }

    if(this.patient.situation=='Marier')
    {
      this.situationM=true;
    }else{
      this.situationC=true
    }
    console.log('%ceditPatient.component.ts line:24 this.patient', 'color: #007acc;', this.patient);
    this.editForm=this.formBuilder.group(
      {
        idPatient:[''],
        codePatient:[''],
        firstname:[''],
        lastname:[''],
        dateNaissance:[''],
        sexe:[''],
        codeAssurance:[''],
        numTel:[''],
        situation:[''],
        adresse:[''],
        ville:[''],
        pays:[''],
        email:[''],
        allergie:[''],
        antecedantPerso:[''],
        anticidentFam:[''],
        maladieCronique:[''],


      }
    );

    this.editForm.patchValue({
      idPatient:this.patient.idPatient,
      codePatient:this.patient.codePatient,
      firstname:this.patient.firstname,
      lastname:this.patient.lastname,
      dateNaissance:this.datePipe.transform(this.patient.dateNaissance, 'yyyy-MM-dd'),
      sexe:this.patient.sexe,
      codeAssurance:this.patient.codeAssurance,
      numTel:this.patient.numTel,
      situation:this.patient.situation,
      adresse:this.patient.adresse,
      pays:this.patient.pays,
      ville:this.patient.ville,
      email:this.patient.email,
      allergie:this.patient.allergie,
      antecedantPerso:this.patient.antecedantPerso,
      anticidentFam:this.patient.anticidentFam,
      maladieCronique:this.patient.maladieCronique,
    }
    );

  }

}
