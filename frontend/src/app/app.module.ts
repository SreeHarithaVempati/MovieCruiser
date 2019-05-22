import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MovieModule}from './modules/movie/movie.module';
import {AuthenticationModule}from './modules/authentication/authentication.module';
import { MatCheckboxModule,  MatDialogModule, MatInputModule, MatFormFieldModule} from '@angular/material';

import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{RouterModule,Routes} from '@angular/router';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatButtonModule} from '@angular/material/button';
import{FormsModule} from '@angular/forms'
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { AuthGuardService } from './auth-guard.service';


const appRoutes:Routes=[
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  }
]
@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    MovieModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
   MatFormFieldModule,
   AuthenticationModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
