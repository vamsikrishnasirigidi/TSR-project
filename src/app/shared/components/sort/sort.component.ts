import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  @Input() placeholder: string = 'search ...';
  @Input() icon: string = 'pi pi-search';
  @Input() name: any;
  @Input() formGroup: FormGroup;
  @Input() buttonLabel: string = 'Add Organization';
  @Output() searchInput = new EventEmitter<any>();
  @Output() buttonClick = new EventEmitter<any>();
  @Input() clearInputField: boolean = false;
  eventFromInputText(event) {
    this.searchInput.emit(event);
  }
  button() {
    this.buttonClick.emit();
  }
}
