import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent {
  @Input() ngModel: string;
  @Input() toggleMask: boolean = true;
  @Input() formGroup: FormGroup;
  @Input() class = 'inputbox';
  @Input() name = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() maxlength: number = null;
  @Input() minlength: number = null;
  @Input() showErrorMessage = true;
  @Input() error = '';
  @Input() placeholder = null;
  @Input() icon = '';
  @Input() pKeyFilter: string;
  @Input() label = '';
  @Input() className = '';
  @Input() inlineStyle = '';
  @Input() spaces: number;
  @Input() numbersOnly = false;
  @Input() requiredStar = false;
  @Output() eventHappend = new EventEmitter<any>();
  @Output() enter = new EventEmitter<any>();
  style: string;
  ngOnInit(): void {
    this.style = this.style + this.inlineStyle;
  }
  eventFromInputText(event) {
    this.eventHappend.emit(event);
  }
  enterClicked() {
    this.enter.emit();
  }
}
