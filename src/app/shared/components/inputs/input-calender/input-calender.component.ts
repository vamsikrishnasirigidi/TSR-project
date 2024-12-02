import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-calender',
  templateUrl: './input-calender.component.html',
  styleUrls: ['./input-calender.component.scss'],
})
export class InputCalenderComponent {
  @Input()
  formGroup: FormGroup;
  @Input() class = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() showTime = false;
  @Input() timeOnly = false;
  @Input() hourFormat = '24';
  @Input() minDate: Date = null;
  @Input() maxDate: Date = null;
  @Input() showErrorMessage = true;
  @Input() error = '';
  @Input() placeholder: string = null;
  @Input() styleClass: string = null;
  @Input() selectionMode: 'multiple' | 'single' | 'range' = 'single';
  @Input() label = '';
  @Input() showClear = false;
  @Input() className = '';
  @Input() hideOnDateTimeSelect = true;
  @Input() requiredStar = false;
  date: Date;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  onSelect(): void {
    this.select.emit();
  }
  onClear(): void {
    this.clear.emit();
  }

}
