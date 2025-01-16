import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
})
export class InputTextAreaComponent {
  @Input() formGroup: FormGroup;
  @Input() class = 'inputbox';
  @Input() name = '';
  @Input() disabled = false;
  @Input() minlength: number | string = '';
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
  @Input() requiredStar: boolean;

  @Input() autoResize = false;

  @Input() rows;
  @Input() cols;
  style: string =
    '  background: #0f0f0f;border: 0.6px solid rgba(240, 240, 240, 0.3);width: 100%;color: #ffffff;box-sizing: border-box;border-radius: 2px;padding-left: 1.7rem; height: 100%;';
  ngOnInit(): void {
    this.style = this.inlineStyle;
  }
  isWhiteSpace(char): boolean {
    return /\s/.test(char);
  }
  initialSpace(event): boolean {
    return !(event.keyCode === 32 && event.target.value.length == 0);
  }
}
