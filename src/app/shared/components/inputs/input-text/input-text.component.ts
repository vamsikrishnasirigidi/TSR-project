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
  @Input() showLoader: boolean = false
  @Input() formGroup: FormGroup;
  @Input() class = 'inputbox';
  @Input() mainClass = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() disableLink=false;
  @Input() searchBar = false;
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
  @Input() generateSerial = false;
  @Input() className = '';
  @Input() min: number;
  @Input() max: number;
  @Input() inlineStyle = '';
  @Input() spaces: number;
  @Input() numbersOnly = false;
  @Input() decimalValues = true;
  @Input() phoneNumber = false;
  @Input() clearInputField = false;
  @Input() requiredStar = false;
  // @Input() searchBoolean = false;
  @Input() showCountryCodes = false;
  @Input() hideSpecialChar = true;
  @Input() emailTemplate = false;
  @Input() caps=false;
  @Input() searchCrossIcon=true;
  @Input() sideLabel:String;
  @Input() tabNotAllowed:boolean=false;
  @Output() eventHappend = new EventEmitter<any>();
  @Output() eventFromSideLabel = new EventEmitter<any>();
  @Output() enter = new EventEmitter<any>();
  style: string;
  @Input() countryFormControlName = '';
  phoneNumberMaxlength = 14;
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

  onClickSideLabel(){
    this.eventFromSideLabel.emit();
  }
  eventFromInputText(event) {
    this.formGroup.get(this.name).setValue(_.trimStart(event.target.value));
    // if (this.numbersOnly && !Number.isInteger(+event.target.value)) {
    //   event.target.value = null;
    //   this.formGroup.get(this.name).setValue(null);
    // }
    if (this.searchBar) {
      this.eventHappend.emit(event.target.value);
      // this.searchBoolean = Boolean(this.formGroup.value[this.name]);
    } else {
      if (this.hideSpecialChar && !this.emailTemplate) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s.-]/g, '');
        this.formGroup.get(this.name).setValue(event.target.value);
      }
      if (this.emailTemplate) {
        const value = event.target.value.replace(/[^a-z0-9@.-]/gi, '').replace(/@{2,}/g, '@').replace(/--+/g, '-').toLowerCase();    
        this.formGroup.get(this.name).setValue(value);
      }
      if(this.caps){
        const value = event.target.value.toUpperCase();
        this.formGroup.get(this.name).setValue(value);
      }
      this.eventHappend.emit(event.target.value);
      // this.searchBoolean = Boolean(this.formGroup.value[this.name]);
    }
  }
  onKeyDown(event: Event,inputElement:HTMLInputElement) {
    const keyboard=event as KeyboardEvent
    if ((keyboard.key === 'Tab' || keyboard.keyCode === 9) && this.tabNotAllowed ) {
      event.preventDefault();
      setTimeout(() => {
        inputElement.focus();
      });
    }
  }
  FromInputText(event) {
    this.formatPhoneNumber(event.target.value);
  }
  removeText(event) {
    let lastValidValue = '';
    event.target.addEventListener('input', (event) => {
      const inputValue = event.target.value;
      if (this.numbersOnly && isNaN(inputValue)) {
        event.target.value = lastValidValue;
        this.formGroup.get(this.name).setValue(lastValidValue);
      } else {
        lastValidValue = inputValue;
      }
    });
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
  removespaces(event) {
    if (this.numbersOnly) {
      if (event.keyCode === 32) {
        return false;
      } else {
        return true;
      }
    } else return true;
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (!this.decimalValues) {
      if (charCode === 46) {
        event.preventDefault();
        return false;
      }
    }
    if (
      (charCode > 31 && charCode < 48) ||
      (charCode > 57 &&
        charCode !== 8 &&
        charCode !== 46 &&
        charCode !== 32 &&
        charCode !== 13)
    ) {
      return false;
    }
    return true;
  }
  inputFieldClear() {
    // this.formGroup.reset();
    this.formGroup.get(this.name).setValue(null);
    // this.searchBoolean = Boolean(this.formGroup.value[this.name]);
    this.eventHappend.emit('');
  }
  initialSpace(event): boolean {
    return !(event.keyCode === 32 && event.target.value.length == 0);
  }
  formatPhoneNumber(value: string) {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = '';
    if (numericValue.length >= 1) {
      formattedValue = `(${numericValue.slice(0, 3)}`;
    }
    if (numericValue.length > 3) {
      formattedValue += `) ${numericValue.slice(3, 6)}`;
    }
    if (numericValue.length > 6) {
      formattedValue += `-${numericValue.slice(6, 10)}`;
    }
    this.formGroup.get(this.name).setValue(formattedValue);
  }
}
