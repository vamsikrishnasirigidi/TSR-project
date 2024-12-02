import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent {
  @Input() name: string='';
  @Input() multiple: boolean=false;
  @Input() formGroup: FormGroup;
  @Output() imageUploaded=new EventEmitter()
  @Input() labelName: string = 'Upload';
  uploadImage(event) {
    this.imageUploaded.emit(event);
  }
}
