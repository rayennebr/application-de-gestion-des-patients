import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVous } from 'src/app/features/models/rendez-vous';
import { RendezVousService } from 'src/app/features/services/rendez-vous.service';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addAppointment',
  templateUrl: './addAppointment.component.html',
  styleUrls: ['./addAppointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  public addForm!:FormGroup;
  submitted = false;
  public patient!:any;
  dateValue:any;
  currentRendezVous$:RendezVous[]=[];
  constructor(private formBuilder:FormBuilder,
    private sharedDataService:SharedDataService,
    private rdvService:RendezVousService,
    private router:Router) { }

  ngOnInit() {
    this.patient=this.sharedDataService.getPatient();
    console.log('%cadd-rdv.component.ts line:24 this.patient', 'color: #007acc;', this.patient);
    this.addForm=this.formBuilder.group(
      {
        idRdv:[''],
        codeRdv:[this.generateRandomString(6),Validators.required],
        dateRdv:['',Validators.required],
        heureRdv:['',Validators.required],
        idPatient:[this.patient.idPatient,Validators.required],
        statusRdv:['CRE'],
        motif:['',Validators.required],
        typeRdv:['',Validators.required],
      }
    );
  }

  getDateValue(event:any)
  {
    console.log('%caddAppointment.component.ts line:17 dateValue', 'color: #007acc;', this.dateValue);
    this.getAllCurrentRendezVous();
  }

  get formControl() { return this.addForm.controls; }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  addRdv():void{
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    console.log('%cadd-patient.component.ts line:34 this.addForm.value', 'color: #007acc;', this.addForm.value);
    this.rdvService.addRdv(this.addForm.value).subscribe((res)=>{
      if(res.status=='200')
      {
        Swal.fire({
          title: 'Rendez-vous Ajoutée !',
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
    })
  }
  getAllCurrentRendezVous(){
    this.rdvService.getByDateRdv(this.dateValue).subscribe((res:ApiResponse<RendezVous>)=>{
      this.currentRendezVous$=res.data.map((item:RendezVous)=>RendezVous.fromJson(item));
    })
  }
}
