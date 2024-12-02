import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from '../screens/user-management/user-management.component';
import { SettingsComponent } from '../screens/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    // component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'organization', pathMatch: 'full' },
      { path: 'userManagement', component: UserManagementComponent },
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
