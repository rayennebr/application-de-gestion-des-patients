import { Patient } from "./patient";
import { RendezVous } from "./rendez-vous";

export class Consultation {
  public static fromJson(json:any):Consultation{
    return new Consultation(
      json['idConsultation'],
      json['idRdv'],
      json['idPatient'],
      json['codeConsultation'],
      json['typeConsultation'],
      json['poidsPatient'],
      json['taillePatient'],
      json['motifConsultation'],
      json['examenConsultation'],
      json['prixConsultation'],
      json['createdAt'],
      json['modifiedAt'],
      json['patient'],
      json['rendezVous']
    )

  }

  constructor(
    public idConsultation:number,
    public idRdv:number,
    public idPatient:number,
    public codeConsultation:string,
    public typeConsultation:string,
    public poidsPatient:number,
    public taillePatient:number,
    public motifConsultation:string,
    public examenConsultation:string,
    public prixConsultation:number,
    public createdAt:Date,
    public modifiedAt:Date,
    public  patient:Patient,
    public  rendezVous:RendezVous
  ){}
}
