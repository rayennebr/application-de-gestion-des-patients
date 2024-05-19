import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  url = 'http://localhost:8082/api/v1/consultation';
  constructor(public http: HttpClient) {}

  public getAlConsultation(): Observable<ApiResponse<Consultation>> {
    return this.http.get<ApiResponse<Consultation>>(this.url + '/');
  }

  public addConsultation(
    Consultation: any
  ): Observable<ApiResponse<Consultation>> {
    return this.http.post<ApiResponse<Consultation>>(
      this.url + '/',
      Consultation
    );
  }

  getConsultationByAppointement(
    id: any
  ): Observable<ApiResponse<Consultation>> {
    return this.http.get<ApiResponse<Consultation>>(this.url + '/getConsultationByIdRdv/' + id);
  }
}
