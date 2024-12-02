
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  @Input() formGroup: FormGroup;
  @Input() className = '';
  @Input() class = '';
  @Input() name = '';
  @Input() disabled=false;
  @Input() showErrorMessage = true;
  @Input() error = '';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() label:string = null;
  @Input() filter =true;
  @Input() options:any[] = null;
  @Input() optionLabel:string=null;
  @Input() defaultLabel:string=null;
  @Input() optionDisabled:string=null;
  @Input() showHeader=true;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChangeHappened = new EventEmitter<any>();
  @Input() requiredStar = false;
  onChangeEvent(event) {
    this.onChangeHappened.emit()

  }



}
