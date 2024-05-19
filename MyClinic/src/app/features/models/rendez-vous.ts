import { Patient } from "./patient";

export class RendezVous {
  public static fromJson(json:any):RendezVous{
    return new RendezVous(
      json['idRdv'],
      json['codeRdv'],
      json['dateRdv'],
      json['heureRdv'],
      json['idPatient'],
      json['statusRdv'],
      json['typeRdv'],
      json['motif'],
      json['createdAt'],
      json['modifiedAt'],
      json['patient'],
    )
  }constructor(public idRdv: number,
                public codeRdv: string,
                public dateRdv: Date,
                public heureRdv: string,
                public idPatient: number,
                public statusRdv: string,
                public typeRdv:string,
                public motif:string,
                public createdAt: Date,
                public modifiedAt: Date,
                public patient:Patient){}
}
