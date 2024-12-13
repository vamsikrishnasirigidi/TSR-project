import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InputCalenderComponent } from './inputs/input-calender/input-calender.component';
import { DropdownComponent } from './inputs/dropdown/dropdown.component';
import { CheckBoxComponent } from './inputs/check-box/check-box.component';
import { ButtonComponent } from './inputs/button/button.component';

import { LocationAutocompleteComponent } from './location-autocomplete/location-autocomplete.component';
import { HeaderComponent } from './header/header.component';
import { MultiSelectComponent } from './inputs/multi-select/multi-select.component';
import { PrimeUIModule } from '../prime-ui/prime-ui.module';
import { TableComponent } from './table/table.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UploadButtonComponent } from './inputs/upload-button/upload-button.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { SortComponent } from './sort/sort.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InputTextAreaComponent } from './inputs/input-text-area/input-text-area.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormComponent } from './form/form.component';
import { CardComponent } from './card/card.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WhatsappLinkComponent } from './whatsapp-link/whatsapp-link.component';
@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    InputTextComponent,
    InputCalenderComponent,
    DropdownComponent,
    CheckBoxComponent,
    ButtonComponent,
    SideNavComponent,
    LocationAutocompleteComponent,
    HeaderComponent,
    MultiSelectComponent,
    TableComponent,
    UploadButtonComponent,
    DeleteDialogComponent,
    InputPasswordComponent,
    SortComponent,
    ChangePasswordComponent,
    InputTextAreaComponent,
    PageLoaderComponent,
    FooterComponent,
    GalleryComponent,
    FormComponent,
    CardComponent,
    DetailsFormComponent,
    AdminDashboardComponent,
    WhatsappLinkComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeUIModule],
  exports: [
    FormsModule,
    TableComponent,
    DeleteDialogComponent,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    InputTextComponent,
    InputCalenderComponent,
    DropdownComponent,
    CheckBoxComponent,
    ButtonComponent,
    HeaderComponent,
    LocationAutocompleteComponent,
    MultiSelectComponent,
    PageNotFoundComponent,
    SideNavComponent,
    UploadButtonComponent,
    TableComponent,
    InputPasswordComponent,
    SortComponent,
    InputTextAreaComponent,
    PageLoaderComponent,
    GalleryComponent,
    DetailsFormComponent,
    AdminDashboardComponent,
    WhatsappLinkComponent
  ],
})
export class ComponentsModule {}
