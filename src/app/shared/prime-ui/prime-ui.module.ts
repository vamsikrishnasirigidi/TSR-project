import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarGroupModule } from 'primeng/avatargroup';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    RadioButtonModule,
    DialogModule,
    BadgeModule,
    PasswordModule,
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    CheckboxModule,
    KeyFilterModule,
    TableModule,
    FileUploadModule,
    InputSwitchModule,
    PaginatorModule,
    ConfirmDialogModule,
    InputNumberModule,
    CardModule,
    DialogModule,
    InputTextareaModule,
    CalendarModule,
    TabViewModule,
    TooltipModule,
    ImageModule,
    GalleriaModule,
    MultiSelectModule,
    SidebarModule,
    AvatarGroupModule
  ]
})
export class PrimeUIModule { }
