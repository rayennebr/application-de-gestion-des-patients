import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RendezVousService } from './features/services/rendez-vous.service';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [RendezVousService],
  bootstrap: [AppComponent]
})
export class AppModule { }
