import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppDialog]'
})
export class AppDialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
