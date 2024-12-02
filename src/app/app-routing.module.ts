import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './modules/Auth/signIn/signin.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import * as _ from 'lodash';
import { RouteGuard } from './modules/Auth/services/auth-guard/route.guard';
import { Roles } from './common/roles';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
    canActivate: [RouteGuard],
    data: {
      permittedRoles: _.concat(Roles.Admin),
    },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
