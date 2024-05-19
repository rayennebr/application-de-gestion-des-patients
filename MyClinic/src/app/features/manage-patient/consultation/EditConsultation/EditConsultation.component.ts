import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consultation } from 'src/app/features/models/consultation';
import { RendezVous } from 'src/app/features/models/rendez-vous';
import { ConsultationService } from 'src/app/features/services/consultation.service';
import { ApiResponse } from 'src/app/features/shared/api-response';
import { SharedDataService } from 'src/app/features/shared/sharedData.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-EditConsultation',
  templateUrl: './EditConsultation.component.html',
  styleUrls: ['./EditConsultation.component.css'],
  providers: [DatePipe],
})
export class EditConsultationComponent implements OnInit {
  @Input() rendezVous!: RendezVous;

  public editForm!: FormGroup;
  submitted = false;
  public taille!: number;
  public poidsLorentz!: number;
  public poidsCreff!: any;
  public poidsCreffM!: any;
  public poidsCreffL!: any;
  public currentAge!: any;
  public age!: number;
  public calcul = false;
  public imc!: number;
  public currentConsultation$!: Consultation;

  constructor(
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private consultationService: ConsultationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.currentAge = this.datePipe.transform(
      this.rendezVous.patient.dateNaissance,
      'yyyy-MM-dd'
    );
    this.age = this.calculerAge(this.currentAge);
    console.log(
      '%cEditConsultation.component.ts line:30 this.sharedDataService.getRdv().idRdv',
      'color: #007acc;',
      this.rendezVous.idRdv
    );
    console.log(
      '%cEditConsultation.component.ts line:31 this.sharedDataService.getPatient().idPatient',
      'color: #007acc;',
      this.rendezVous.patient.idPatient
    );
    this.editForm = this.formBuilder.group({
      idRdv: [this.rendezVous.idRdv],
      idPatient: [this.rendezVous.patient.idPatient],
      codeConsultation: [
        'CD' +
          this.rendezVous.patient.idPatient +
          this.rendezVous.idRdv +
          this.datePipe.transform(new Date(), 'yyyy'),
      ],
      typeConsultation: [this.sharedDataService.getRdv().typeRdv],
      poidsPatient: ['', Validators.required],
      taillePatient: ['', Validators.required],
      motifConsultation: ['', Validators.required],
      examenConsultation: ['', Validators.required],
      prixConsultation: ['', Validators.required],
    });

    this.getCurrentConsultation();

  }

  calculPoids(event: any) {
    console.log(
      '%ceditAppointment.component.ts line:50 this.taille',
      'color: #007acc;',
      this.taille
    );
    this.poidsLorentz = this.taille - 100 - (this.taille - 150) / 2.5;
    this.poidsCreff = (this.taille - 100 + this.age / 10) * 0.9;
    this.poidsCreffL = (this.taille - 100 + this.age / 10) * 0.9 * 1.1;
    this.poidsCreffM = (this.taille - 100 + this.age / 10) * 0.9 * 0.9;
    console.log(
      '%ceditAppointment.component.ts line:53 this.poidsLorentz',
      'color: #007acc;',
      this.poidsLorentz
    );
    console.log(
      '%ceditAppointment.component.ts line:53 this.poidsCreff',
      'color: #007acc;',
      this.poidsCreff
    );
    console.log(
      '%ceditAppointment.component.ts line:53 this.poidsCreffL',
      'color: #007acc;',
      this.poidsCreffL
    );
    console.log(
      '%ceditAppointment.component.ts line:53 this.poidsCreffM',
      'color: #007acc;',
      this.poidsCreffM
    );
    this.calcul = true;
  }

  createConsultation() {
    console.log(
      '%cEditConsultation.component.ts line:80 this.editForm.value',
      'color: #007acc;',
      this.editForm.value
    );

    this.consultationService
      .addConsultation(this.editForm.value)
      .subscribe((res: ApiResponse<Consultation>) => {
        if (res.status == '200') {
          Swal.fire({
            title: 'Voulez vous donner une Ordonance !',
            text: res.message,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/manage/patient']);
            } else {
              this.router.navigate(['/']);
            }
          });
        } else {
          {
            Swal.fire({
              icon: 'error',
              title: 'Erreur !',
              text: res.message,
              showCancelButton: false,
              confirmButtonText: 'Oui',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.router.navigate(['/manage/patient']);
              }
            });
          }
        }
      });
  }

  calculerAge(dateNaissanceStr: string): number {
    const dateNaissance = new Date(dateNaissanceStr);
    const diff = Date.now() - dateNaissance.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getCurrentConsultation() {
    this.consultationService
      .getConsultationByAppointement(this.rendezVous.idRdv)
      .subscribe((res: ApiResponse<Consultation>) => {
        this.currentConsultation$ = res.data;
        console.log(
          '%cEditConsultation.component.ts line:185 this.currentConsultation$',
          'color: #007acc;',
          this.currentConsultation$
        );
        if (this.currentConsultation$ != null) {
          console.log(
            '%cEditConsultation.component.ts line:78 this.currentConsultation$',
            'color: #007acc;',
            this.currentConsultation$
          );
          this.editForm.patchValue({
            codeConsultation: this.currentConsultation$.codeConsultation,
            typeConsultation: this.currentConsultation$.typeConsultation,
            poidsPatient: this.currentConsultation$.poidsPatient,
            taillePatient: this.currentConsultation$.taillePatient,
            motifConsultation: this.currentConsultation$.motifConsultation,
            examenConsultation: this.currentConsultation$.examenConsultation,
            prixConsultation: this.currentConsultation$.prixConsultation,
          });
          this.editForm.controls['typeConsultation'].disable();
          this.editForm.controls['poidsPatient'].disable();
          this.editForm.controls['taillePatient'].disable();
          this.editForm.controls['motifConsultation'].disable();
          this.editForm.controls['examenConsultation'].disable();
          this.editForm.controls['prixConsultation'].disable();
        }
      });
  }
}
