import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
} from '@angular/core';
import { AppDialogModule } from './app-dialog.module';
import { AppDialogComponent } from './app-dialog.component';
import {AppDialogConfig} from './app-dialog.config';
import {AppDialogInjector} from './app-dialog.injector';
import {AppDialogRef} from './app-dialog.ref';

@Injectable({
  providedIn: AppDialogModule
})
export class AppDialogService {
  dialogComponentRef: ComponentRef<AppDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(componentType: Type<any>, config: AppDialogConfig): any {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
    this.dialogComponentRef.instance.data = config.data;
    return dialogRef;
  }

  appendDialogComponentToBody(config: AppDialogConfig): any {
    const map = new WeakMap();
    map.set(AppDialogConfig, config);

    const dialogRef = new AppDialogRef();
    map.set(AppDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AppDialogComponent);
    const componentRef = componentFactory.create(new AppDialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
