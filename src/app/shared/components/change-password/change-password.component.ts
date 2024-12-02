import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  confirmPasswordValidation,
  inputRequiredValidations,
  samePasswordValidation,
} from 'src/app/common/utils';
import { AppDialogRef } from '../app-dialog/app-dialog.ref';
import { AuthService } from 'src/app/modules/Auth/services/auth-service/auth.service';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  passwordExpression = regularExpressions.passwordExp;
  buttonLoading: boolean = false;
  errorMessageForPassword: string = "passwords didn't matched";
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: AppDialogRef,
    private auth: AuthService,
    private local: LocalServiceService
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(this.passwordExpression),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(this.passwordExpression),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  inputRequiredValidationsErrors(form: FormGroup, type: string) {
    return inputRequiredValidations(form, type);
  }
  inputPatternValidationsErrors(form: FormGroup, type: string) {
    return PatternValidations(form, type);
  }
  checkSamePasswordValidation(
    form: FormGroup,
    oldPassword: string,
    password: string
  ): boolean {
    return samePasswordValidation(form, oldPassword, password);
  }
  checkPasswordValidation(
    form: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    return confirmPasswordValidation(form, password, confirmpassword);
  }
  ngOnInit(): void {
    this.local.errorLoader.subscribe((res) => {
      this.buttonLoading = res;
    });
  }
  submitForm() {
    if (this.changePasswordForm.valid) {
      const userId = localStorage.getItem('userId');
      this.buttonLoading = true;
      let data = {
        currentPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.password,
      };
      this.auth.resetPassword(data, userId).subscribe((res) => {
        if (res.success) {
          this.buttonLoading = false;
          this.toastr.success(res.message);
          this.dialog.close(true);
          this.changePasswordForm.reset();
        }
      });
    }
  }
  cancelForm() {
    this.dialog.close(true);
    this.changePasswordForm.reset();
  }
}
