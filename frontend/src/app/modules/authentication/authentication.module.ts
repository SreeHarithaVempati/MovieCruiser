import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AuthenticationRouterModule } from './authentication-router.module';
import { FormsModule } from '@angular/forms';
import{MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import{MatCardModule} from '@angular/material/card';

import{MatFormFieldModule,MatInputModule, MatDialogModule, MatToolbarModule,  MatSnackBarModule} from '@angular/material';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationRouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule
  
  
  
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [AuthenticationService],
  exports: [
    AuthenticationRouterModule,RegisterComponent,
    LoginComponent,  MatFormFieldModule
  ]
})
export class AuthenticationModule { }
