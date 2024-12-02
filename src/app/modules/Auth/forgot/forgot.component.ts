import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  inputRequiredValidations,
} from 'src/app/common/utils';
import { AuthService } from '../services/auth-service/auth.service';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  forgotForm: FormGroup;
  errorList: string[] = [''];
  buttonLoading: boolean = false;
  emailValidator = regularExpressions.emailExp;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private local: LocalServiceService
  ) {
    this.forgotForm = this.fb.group({
      email: [
        '',
        [Validators.pattern(this.emailValidator), Validators.required],
      ],
    });
  }
  inputRequiredValidationsErrors(form: FormGroup, type: string) {
    return inputRequiredValidations(form, type);
  }
  inputPatternValidationsErrors(form: FormGroup, type: string) {
    return PatternValidations(form, type);
  }
  ngOnInit(): void {
    this.local.errorLoader.subscribe((res) => {
      this.buttonLoading = res;
    });
  }
  submitForm() {
    this.buttonLoading = true;
    if (this.forgotForm.valid) {
      this.auth.forgotPassword(this.forgotForm.value.email).subscribe((res) => {
        if (res.success) {
          this.forgotForm.reset();
          this.toastr.success(res.message);
          this.buttonLoading = false;
        }
      });
    }
  }
}
