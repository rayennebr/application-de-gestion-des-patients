import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { RendezVous } from '../models/rendez-vous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  url="http://localhost:8082/api/v1/rdv";
  constructor(public httpClient:HttpClient) { }

  getAllRdv():Observable<ApiResponse<RendezVous>> {
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/");
  }

  getAllRdvPerPatient(idPatient: number):Observable<ApiResponse<RendezVous>>  {
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/findAllByIdPatient/"+idPatient);
  }

  getCurrentRdv(date:Date):Observable<ApiResponse<RendezVous>>  {
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/findAllByStatusRdvAndDateRdv/"+date);
  }

  public addRdv(rdv:any):Observable<ApiResponse<RendezVous>>
  {
    return this.httpClient.post<ApiResponse<RendezVous>>(this.url+"/",rdv);
  }

  updateRdv(id:any,data:any):Observable<ApiResponse<RendezVous>>{
    return this.httpClient.put<ApiResponse<RendezVous>>(this.url + "/"+id,data);
  }

  getByDateRdv(date:Date):Observable<ApiResponse<RendezVous>>  {
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/findAllByDateRdv/"+date);
  }

  findAllByDateRdvBetween(currentDate:any,nextDate:any):Observable<ApiResponse<RendezVous>>  {
    let params = new HttpParams()
    .set('currentDate', currentDate)
    .set('nextDate', nextDate);
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/findAllByDateRdvBetween",{ params });
  }

  getRdvPerDate(date:Date):Observable<ApiResponse<RendezVous>>  {
    return this.httpClient.get<ApiResponse<RendezVous>>(this.url + "/findAppointmentByDateRdv/"+date);
  }

}
