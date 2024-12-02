import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signIn/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'signIn', pathMatch: 'full' },
      { path: 'signIn', component: SigninComponent },
      { path: 'forgot-password', component: ForgotComponent },
      {
        path: 'set-password/:token',
        component: RegisterPasswordComponent,
      },
      {
        path: 'set-forgotPassword/:token',
        component: RegisterPasswordComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
