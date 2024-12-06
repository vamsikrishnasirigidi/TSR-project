import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeUIModule } from 'src/app/shared/prime-ui/prime-ui.module';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { UploadLogoComponent } from './settings/upload-logo/upload-logo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuideDetailsComponent } from './sub-screens/guide-details/guide-details.component';
import { EnquiryFormComponent } from './sub-screens/enquiry-form/enquiry-form.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    SettingsComponent,
    UserManagementFormComponent,
    UploadLogoComponent,
    DashboardComponent,
    GuideDetailsComponent,
    EnquiryFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    
  ],
  exports:[
    UserManagementComponent,
    SettingsComponent,
  ]
})
export class ScreensModule { }
