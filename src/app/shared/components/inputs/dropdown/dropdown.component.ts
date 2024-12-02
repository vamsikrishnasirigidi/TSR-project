import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  @Input()
  formGroup!: FormGroup;
  @Input() class = '';
  @Input() name = '';
  @Input() labelName = 'name';
  @Input() options: any = [];
  @Input() disable = false;
  @Input() disabled = false;
  @Input() showClear = false;
  @Input() className = '';
  @Input() showErrorMessage = true;
  @Input() error: any = '';
  @Input() emptyFilterMessage = null;
  @Input() placeholder: string = null;
  @Input() filter = false;
  @Input() filterBy: string = null;
  @Input() label = '';
  @Input() requiredStar = false;
  @Output() onChangeHappened = new EventEmitter<any>();
  @Input() errorBlock: boolean = true;
  onChangeEvent(event) {
    this.onChangeHappened.emit(event);
  }
  constructor() {}
}
