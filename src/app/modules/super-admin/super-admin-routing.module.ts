import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from '../screens/user-management/user-management.component';
import { SettingsComponent } from '../screens/settings/settings.component';
import { DashboardComponent } from '../screens/dashboard/dashboard.component';
import { HomePageComponent } from '../screens/home-page/home-page.component';
import { DetailsFormComponent } from 'src/app/shared/components/details-form/details-form.component';
import { AdminDashboardComponent } from 'src/app/shared/components/admin-dashboard/admin-dashboard.component';
import { GalleryComponent } from 'src/app/shared/components/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'upload-details', pathMatch: 'full' },
      { path: 'upload-details', component: DetailsFormComponent },
      { path: 'gallery', component: GalleryComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
