import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.scss'],
})
export class LocationAutocompleteComponent {
  @Input() label = '';
  @Input() zipCodes: any[] = null;
  @Input() selectedOrigin: any;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() className = '';
  @Input() error = '';
  @Input() isDisabled = false;
  @Input() showZipCode: boolean;
  @Input() maxlength: number;
  @Input() formGroup: FormGroup;
  @Input() hideOrigin: boolean;
  @Input() requiredStar = false;
  @Output() removespaces = new EventEmitter();
  @Output() inputChange = new EventEmitter();
  @Output() ListofzipCodes = new EventEmitter();
  @Output() clearAutocomplete = new EventEmitter();

  spaceTrim(event) {
    this.removespaces.emit(event);
  }
  onChangeInput(event) {
    this.inputChange.emit(event);
  }
  zipCodesList(event) {
    this.ListofzipCodes.emit(event);
  }
  clear(name) {
    this.formGroup.controls[name].setValue('');
  }
}
