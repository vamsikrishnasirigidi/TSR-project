import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  confirmPasswordValidation,
  inputRequiredValidations,
} from 'src/app/common/utils';
import { AuthService } from '../services/auth-service/auth.service';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent {
  errorMessageForPassword: string = "passwords didn't matched";
  registerForm: FormGroup;
  type: string;
  header: string = 'Set Password';
  passwordExpression = regularExpressions.passwordExp;
  buttonLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private local: LocalServiceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
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
    this.type = this.route.snapshot['_routerState'].url.split('/')[2];
    if (this.type === 'set-forgotPassword') {
      this.header = 'Set Password';
    }
  }
  submitForm() {
    if (this.registerForm.valid) {
      this.buttonLoading = true;
      let data = {
        newPassword: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      };
      const token = this.route.snapshot['_routerState'].url.split('=')[1];

      if (this.type === 'set-forgotPassword') {
        this.auth.setForgotPassword(data, token).subscribe((res) => {
          if (res.success) {
            this.buttonLoading = false;
            this.toastr.success(res.message);
            this.registerForm.reset();
            this.local.clear();
            this.router.navigateByUrl('/auth');
          }
        });
      } else {
        this.auth.setNewPassword(data, token).subscribe((res) => {
          if (res.success) {
            this.buttonLoading = false;
            this.toastr.success(res.message);
            this.registerForm.reset();
            this.local.clear();
            this.router.navigateByUrl('/auth');
          }
        });
      }
    }
  }
}
