import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { CountryPhoneCodes } from 'src/app/common/phoneCodes';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTextComponent {
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
  @Input() type = 'text';
  @Input() icon = '';
  @Input() pKeyFilter: string;
  @Input() label = '';
  @Input() className = '';
  @Input() min: number;
  @Input() max: number;
  @Input() inlineStyle = '';
  @Input() spaces: number;
  @Input() numbersOnly = false;
  @Input() clearInputField = false;
  @Input() requiredStar = false;
  @Input() searchBoolean = false;
  @Input() showCountryCodes = false;
  @Input() hideSpecialChar = true;
  @Input() emailTemplate = false;
  @Output() eventHappend = new EventEmitter<any>();
  @Output() enter = new EventEmitter<any>();
  style: string;
  @Input() countryFormControlName = '';
  countryCodes = CountryPhoneCodes;
  ngOnInit(): void {
    this.style = this.style + this.inlineStyle;
  }
  // stop white spaces
  isWhiteSpace(char): boolean {
    return /\s/.test(char);
  }
  enterClicked() {
    this.enter.emit();
  }
  eventFromInputText(event) {
    this.formGroup.get(this.name).setValue(_.trimStart(event.target.value));
    if (this.numbersOnly && !Number.isInteger(+event.target.value)) {
      event.target.value = null;
      this.formGroup.get(this.name).setValue(null);
    }
    if (this.hideSpecialChar && !this.emailTemplate) {
      event.target.value = event.target.value.replace(/[^\w\s]/gi, '');
    }
    if (this.emailTemplate) {
      const value = event.target.value
        .replace(/[^a-z0-9@.]/gi, '')
        .replace(/@{2,}/g, '@')
        .toLowerCase();
      this.formGroup.get(this.name).setValue(value);
    }
    this.eventHappend.emit(event.target.value);
    this.searchBoolean = Boolean(this.formGroup.value[this.name]);
  }
  willCreateWhitespaceSequence(evt): boolean {
    let willCreateWSS = false;
    if (this.isWhiteSpace(evt.key)) {
      const elmInput = evt.currentTarget;
      const content = elmInput.value;
      const posStart = elmInput.selectionStart;
      const posEnd = elmInput.selectionEnd;
      willCreateWSS =
        this.isWhiteSpace(content[posStart - 1] || '') ||
        this.isWhiteSpace(content[posEnd] || '');
    }
    return willCreateWSS;
  }

  isAlfa(evt: any): boolean {
    return this.willCreateWhitespaceSequence(evt) ? false : true;
  }
  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    } else {
      return true;
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 31 && charCode < 48) ||
      (charCode > 57 && charCode !== 8 && charCode !== 46 && charCode !== 32)
    ) {
      return false;
    }
    return true;
  }
  inputFieldClear() {
    this.formGroup.reset();
    this.searchBoolean = Boolean(this.formGroup.value[this.name]);
    this.eventHappend.emit('');
  }
  initialSpace(event): boolean {
    return !(event.keyCode === 32 && event.target.value.length == 0);
  }
}
