import { Observable, Subject } from 'rxjs';

export class AppDialogRef {
  constructor() {}

  private readonly afterClosedSubject = new Subject<any>();
  afterClosed: Observable<any> = this.afterClosedSubject.asObservable();

  close(result?: any): void {
    this.afterClosedSubject.next(result);
  }
}
