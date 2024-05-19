import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RendezVous } from '../models/rendez-vous';
import { RendezVousService } from '../services/rendez-vous.service';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { ApiResponse } from '../shared/api-response';
import Swal from 'sweetalert2';
import { SharedDataService } from '../shared/sharedData.service';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
  currentRendezVous$: RendezVous[] = [];
  weekRendezVous$: RendezVous[] = [];
  lastConsultation$: Consultation[] = [];
  public currentDate = new Date();
  public Date: any;
  public nextDate: any;
  constructor(
    public patientService: PatientService,
    public rdvService: RendezVousService,
    private datePipe: DatePipe,
    public router: Router,
    public sharedService: SharedDataService,
    public consultationService: ConsultationService
  ) {
    this.Date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    let nextWeek = new Date(
      this.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    this.nextDate = this.datePipe.transform(nextWeek, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getAllCurrentRendezVous();
    this.getAlAppointmentByWeek();
    this.getLastConsult();
  }

  getAllCurrentRendezVous() {
    this.rdvService
      .getRdvPerDate(this.Date)
      .subscribe((res: ApiResponse<RendezVous>) => {
        this.currentRendezVous$ = res.data.map((item: RendezVous) =>
          RendezVous.fromJson(item)
        );
        this.currentRendezVous$.sort((a, b) => {
          const timeA = this.convertTo24Hour(a.heureRdv);
          const timeB = this.convertTo24Hour(b.heureRdv);
          if (timeA < timeB) {
            return -1;
          }
          if (timeA > timeB) {
            return 1;
          }
          return 0;
        });
      });
  }

  getAlAppointmentByWeek() {
    this.rdvService
      .findAllByDateRdvBetween(this.Date, this.nextDate)
      .subscribe((res: ApiResponse<RendezVous>) => {
        this.weekRendezVous$ = res.data.map((item: RendezVous) =>
          RendezVous.fromJson(item)
        );
        console.log(
          '%cdashboard.component.ts line:47 this.weekRendezVous$',
          'color: #007acc;',
          this.weekRendezVous$
        );
      });
  }

  validateAppointment(appointment: any) {
    Swal.fire({
      title: 'Commençer ou Annuler la consultation ?',
      text:
        'Consultation prévu de Mr ' +
        appointment.patient.firstname +
        ' à ' +
        appointment.heureRdv,
      icon: 'info',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Commencer',
      denyButtonText: `Annuler Rendez vous !`,
      cancelButtonText: 'fermer',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let currentAppointment = appointment;
        currentAppointment.statusRdv = 'TR';
        console.log(
          '%cdashboard.component.ts line:66 currentAppointemnt',
          'color: #007acc;',
          currentAppointment
        );
        this.rdvService
          .updateRdv(appointment.idRdv, currentAppointment)
          .subscribe((res) => {
            if ((res.status = '200')) {
              Swal.fire('Consultation En Cours ', '', 'success');
              this.sharedService.setRdv(currentAppointment);
              this.router.navigate(['/manage/editAppoitment']);
            } else {
              Swal.fire(res.message, '', 'error');
            }
          });
      } else if (result.isDenied) {
        let currentAppointment = appointment;
        currentAppointment.statusRdv = 'ANL';
        this.rdvService
          .updateRdv(appointment.idRdv, currentAppointment)
          .subscribe((res) => {
            if ((res.status = '200')) {
              Swal.fire(
                'RendezVous annuleé de Mr ' + appointment.patient.firstname,
                '',
                'error'
              );
            } else {
              Swal.fire(res.message, '', 'error');
            }
          });
      }
    });
  }

  convertTo24Hour(time: string) {
    let hours = Number(time.match(/^(\d+)/)?.[1]);
    let minutes = Number(time.match(/:(\d+)/)?.[1]);
    const AMPM = time.match(/\s(.*)$/)?.[1];
    if (AMPM === 'PM' && hours < 12) hours = hours + 12;
    if (AMPM === 'AM' && hours == 12) hours = hours - 12;
    let sHours = hours < 10 ? '0' + hours : hours;
    let sMinutes = minutes < 10 ? '0' + minutes : minutes;
    return sHours + ':' + sMinutes;
  }
  openConsult(item: any) {}

  getLastConsult() {
    this.consultationService
      .getAlConsultation()
      .subscribe((res: ApiResponse<Consultation>) => {
        this.lastConsultation$ = res.data;
        console.log(
          '%cdashboard.component.ts line:129 this.lastConsultation$',
          'color: #007acc;',
          this.lastConsultation$
        );
      });
  }
}
