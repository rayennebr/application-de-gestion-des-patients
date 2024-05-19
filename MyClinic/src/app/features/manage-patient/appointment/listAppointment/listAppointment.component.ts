import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Patient } from 'src/app/features/models/patient';
import { RendezVous } from 'src/app/features/models/rendez-vous';
import { RendezVousService } from 'src/app/features/services/rendez-vous.service';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';

@Component({
  selector: 'app-listAppointment',
  templateUrl: './listAppointment.component.html',
  styleUrls: ['./listAppointment.component.css'],
})
export class ListAppointmentComponent implements OnInit,OnChanges {
  rendezVousPerPatient$:RendezVous[]=[];
  @Input()patient!:Patient;
  constructor(private rdvService:RendezVousService,
    private saredDataService:SharedDataService,
    ) { }


  ngOnChanges(){
    this.getAllRendezVousPerPatient();

  }

  ngOnInit() {
  }

  getAllRendezVousPerPatient(){
    this.rdvService.getAllRdvPerPatient(this.patient.idPatient).subscribe((res:ApiResponse<RendezVous>)=>{
      this.rendezVousPerPatient$=res.data.map((item:RendezVous)=>RendezVous.fromJson(item));
    })
  }

  getRendezVous(item:any){
    console.log('%crendez-vous.component.ts line:17 item', 'color: #007acc;', item);
  }
  addRdv()
  {
    this.saredDataService.setPatient(this.patient);
  }
  editRdv(rdv:any)
  {
    this.saredDataService.setRdv(rdv);
  }
}
