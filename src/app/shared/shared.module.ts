import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDialogModule } from './components/app-dialog/app-dialog.module';
import { PrimeUIModule } from './prime-ui/prime-ui.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [ AppDialogModule,PrimeUIModule,ComponentsModule],
})
export class SharedModule { }
