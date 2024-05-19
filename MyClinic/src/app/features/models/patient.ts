export class Patient {
  [x: string]: any;
  public static fromJson(json:any):Patient{
    return new Patient(
      json['idPatient'],
      json['codePatient'],
      json['firstname'],
      json['lastname'],
      json['dateNaissance'],
      json['sexe'],
      json['codeAssurance'],
      json['numTel'],
      json['situation'],
      json['adresse'],
      json['ville'],
      json['pays'],
      json['email'],
      json['allergie'],
      json['antecedantPerso'],
      json['anticidentFam'],
      json['maladieCronique'],
      json['createdAt'],
      json['modifiedAt'],
    );
  }
  constructor(
    public idPatient:number,
    public codePatient:string,
    public firstname:string,
    public lastname:string,
    public dateNaissance:Date,
    public sexe:string,
    public codeAssurance:string,
    public numTel:string,
    public situation:string,
    public adresse:string,
    public ville:string,
    public pays:string,
    public email:string,
    public allergie:string,
    public antecedantPerso:string,
    public anticidentFam:string,
    public maladieCronique:string,
    public createdAt:Date,
    public modifiedAt:Date,
  ){}
}

