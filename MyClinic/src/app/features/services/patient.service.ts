import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
 url="http://localhost:8082/api/v1/patient";
  constructor(public http:HttpClient) { }


  public getAllPatient():Observable<ApiResponse<Patient>>{
    return this.http.get<ApiResponse<Patient>>(this.url+"/");
  }

  public addPatient(patient:any):Observable<ApiResponse<Patient>>
  {
    return this.http.post<ApiResponse<Patient>>(this.url+"/",patient);
  }


}
