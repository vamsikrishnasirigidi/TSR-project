import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/shared/components/admin-dashboard/admin-dashboard.component';
import { GalleryComponent } from 'src/app/shared/components/gallery/gallery.component';
import { EditGalleryComponent } from 'src/app/shared/components/edit-gallery/edit-gallery.component';
import { MainPageLayoutComponent } from '../screens/main-page-layout/main-page-layout.component';
import { SiteLayoutComponent } from '../screens/site-layout/site-layout.component';
import { VideoPageComponent } from '../screens/video-page/video-page.component';
import { ClientsComponent } from '../screens/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'main-layout', pathMatch: 'full' },
      { path: 'main-layout', component: MainPageLayoutComponent },
      { path: 'site-layout', component: SiteLayoutComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'videos', component: VideoPageComponent },
      { path: 'gallery', children: [
        {
          path: '',
          component: GalleryComponent,
        },
        {
          path: 'edit',
          component: EditGalleryComponent,
        },
      ]},
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
