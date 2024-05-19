import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RendezVous } from 'src/app/features/models/rendez-vous';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';
import { DatePipe } from '@angular/common';
import { RendezVousService } from 'src/app/features/services/rendez-vous.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editAppointment',
  templateUrl: './editAppointment.component.html',
  styleUrls: ['./editAppointment.component.css'],
  providers: [DatePipe]
})
export class EditAppointmentComponent implements OnInit {
  public editForm!:FormGroup;
  submitted = false;
  public currentRdv!:RendezVous;
  public taille!:number;
  public poidsLorentz!:number;
  public poidsCreff!:any;
  public poidsCreffM!:any;
  public poidsCreffL!:any;
  public currentAge!:any;
  public age!:number;
  public calcul=false;
  public imc!:number;
  constructor( private saredDataService:SharedDataService,
    private formBuilder:FormBuilder,
    private datePipe: DatePipe,
    private rdvService:RendezVousService,
    private router:Router) { }

  ngOnInit() {
    this.currentRdv=this.saredDataService.getRdv();
   /* if(this.currentRdv.taillePatient!=0)
    {
      this.taille=this.currentRdv.taillePatient;
    }else{
      this.taille=0;
    }*/

    this.currentAge=this.datePipe.transform(this.currentRdv.patient.dateNaissance, 'yyyy-MM-dd');
    this.age = this.calculerAge(this.currentAge);
    console.log('%ceditAppointment.component.ts line:27 this.age', 'color: #007acc;', this.age);
    this.editForm=this.formBuilder.group(
      {
        idRdv:[''],
        codeRdv:[''],
        dateRdv:[''],
        heureRdv:[''],
        idPatient:[''],
        statusRdv:[''],
        createdAt:[''],
        typeRdv:['',Validators.required],
        motif:['',Validators.required],
      }
    );
    console.log('%ceditAppointment.component.ts line:19 this.currentRdv', 'color: #007acc;', this.currentRdv);
    this.editForm.patchValue({
      idRdv:this.currentRdv.idRdv,
      codeRdv:this.currentRdv.codeRdv,
      dateRdv:this.datePipe.transform(this.currentRdv.dateRdv, 'yyyy-MM-dd'),
      heureRdv:this.currentRdv.heureRdv,
      idPatient:this.currentRdv.idPatient,
      statusRdv:this.currentRdv.statusRdv,
      createdAt:this.currentRdv.createdAt,
      typeRdv:this.currentRdv.typeRdv,
      motif:this.currentRdv.motif,
    })

  }



  editRdv(){
    this.submitted = true;
    if(this.editForm.invalid){
      return;
    }
   console.log('%ceditAppointment.component.ts line:44 this.editForm.value', 'color: #007acc;', this.editForm.value);
   this.rdvService.updateRdv(this.currentRdv.idRdv,this.editForm.value).subscribe((res)=>{
    if(res.status=='200')
      {
        Swal.fire({
          title: 'Rendez-vous Modifiée !',
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

  calculerAge(dateNaissanceStr: string): number {
    const dateNaissance = new Date(dateNaissanceStr);
    const diff = Date.now() - dateNaissance.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
