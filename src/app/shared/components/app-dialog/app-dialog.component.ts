import {
  AfterViewInit,
  Component,
  OnDestroy,
  Type,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ChangeDetectorRef, ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AppDialogDirective } from './app-dialog.directive';

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDialogComponent implements AfterViewInit, OnDestroy {
  private readonly onCloseSubject = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public data: any = {};
  public onClose = this.onCloseSubject.asObservable();

  display = true;
  position = 'center';

  @ViewChild(AppDialogDirective)
  insertionPoint: AppDialogDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  loadChildComponent(componentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  onHide(): void {
    if (this.componentRef) {
      this.onCloseSubject.next(this);
    }
  }
}
