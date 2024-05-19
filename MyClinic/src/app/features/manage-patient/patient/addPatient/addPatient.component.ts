import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addPatient',
  templateUrl: './addPatient.component.html',
  styleUrls: ['./addPatient.component.css']
})
export class AddPatientComponent implements OnInit {
  public addForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    public patientService:PatientService,
    ) { }

  ngOnInit() {
    this.addForm=this.formBuilder.group(
      {
        id:[''],
        codePatient:['',Validators.required],
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        dateNaissance:['',Validators.required],
        sexe:[''],
        codeAssurance:['',Validators.required],
        numTel:['',Validators.required],
        situation:['',Validators.required],
        adresse:['',Validators.required],
        ville:['',Validators.required],
        pays:['',Validators.required],
        email:['',Validators.required],
        allergie:['',Validators.required],
        antecedantPerso:['',Validators.required],
        anticidentFam:['',Validators.required],
        maladieCronique:['',Validators.required],


      }
    );
  }
  get formControl() { return this.addForm.controls; }


  addPatient():void{
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    console.log('%cadd-patient.component.ts line:34 this.addForm.value', 'color: #007acc;', this.addForm.value);
    this.patientService.addPatient(this.addForm.value).subscribe((res)=>{

      if(res.status=='200')
      {
        Swal.fire({
          title: 'Patient Ajoutée !',
          text:res.message,
          icon:'success',
          showCancelButton: false,
          confirmButtonText: 'Oui',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/manage/patient']);
          }
        })

      }else{
        {
          Swal.fire({
            icon: 'error',
            title: 'Erreur !',
            text:res.message,
            showCancelButton: false,
            confirmButtonText: 'Oui',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/manage/patient']);
            }
          })

        }
      }
    });
  }


}
