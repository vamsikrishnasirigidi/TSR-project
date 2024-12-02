import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AppDialogComponent } from './app-dialog.component';
import { AppDialogDirective } from './app-dialog.directive';

@NgModule({
  declarations: [AppDialogComponent, AppDialogDirective],
  imports: [
    CommonModule,
    DialogModule,
  ],
  entryComponents: [AppDialogComponent],
  exports: [
    AppDialogDirective
  ]
})
export class AppDialogModule { }
