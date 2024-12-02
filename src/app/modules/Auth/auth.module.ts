import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signIn/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';



@NgModule({
  declarations: [
    SigninComponent,
    ForgotComponent,
    RegisterPasswordComponent
  ],
  imports: [
    CommonModule,AuthRoutingModule,SharedModule
  ],
})
export class AuthModule { }
