import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type = Button;
  @Input() class = '';
  @Input() disabled = false;
  @Input() icon: string = null;
  @Input() label: string = null;
  @Input() message = '';
  @Input() ifHasError = false;
  @Input() loading = false;
  @Input() showIcon = false;
  @Input() mainClass = '';

  @Output() submitForm = new EventEmitter();
  onSubmit(): void {
    this.submitForm.emit();
  }
}
