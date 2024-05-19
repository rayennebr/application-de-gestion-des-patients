import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { RendezVous } from '../models/rendez-vous';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
private patient!:Patient;
private rdv!:RendezVous
constructor() { }

setPatient(patient:Patient):void{
  this.patient=patient;
}

getPatient(){
  return this.patient;
}

setRdv(rdv:RendezVous):void{
  this.rdv=rdv;
}

getRdv(){
  return this.rdv;
}
}
