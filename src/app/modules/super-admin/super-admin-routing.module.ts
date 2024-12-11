import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from '../screens/user-management/user-management.component';
import { SettingsComponent } from '../screens/settings/settings.component';
import { DashboardComponent } from '../screens/dashboard/dashboard.component';
import { HomePageComponent } from '../screens/home-page/home-page.component';
import { DetailsFormComponent } from 'src/app/shared/components/details-form/details-form.component';
import { AdminDashboardComponent } from 'src/app/shared/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    // component: HomePageComponent,
    // redirectTo: 'details-form',
    // pathMatch: 'full',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
