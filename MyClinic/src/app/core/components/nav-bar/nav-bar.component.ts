import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RendezVous } from 'src/app/features/models/rendez-vous';
import { RendezVousService } from 'src/app/features/services/rendez-vous.service';
import { ApiResponse } from 'src/app/features/shared/api-response';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [DatePipe]
})
export class NavBarComponent  implements OnInit {
  currentRendezVous$:RendezVous[]=[];
  public currentDate = new Date();
  public Date:any;
  public nbrRdv!:number;
  constructor(public rdvService:RendezVousService ,
    private datePipe: DatePipe) {
this.Date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
}

ngOnInit(): void {
this.getAllCurrentRendezVous();
}


getAllCurrentRendezVous(){
this.rdvService.getCurrentRdv(this.Date).subscribe((res:ApiResponse<RendezVous>)=>{
this.currentRendezVous$=res.data.map((item:RendezVous)=>RendezVous.fromJson(item));
this.nbrRdv=this.currentRendezVous$.length;
})
}
}
