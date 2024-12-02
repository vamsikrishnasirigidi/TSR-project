import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  inputRequiredValidations,
  minLengthValidations,
} from 'src/app/common/utils';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loginForm: FormGroup;
  errorList: string[] = [''];
  emailValidator = regularExpressions.emailExp;
  loadingButton: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localService: LocalServiceService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.pattern(this.emailValidator), Validators.required],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.localService.errorLoader.subscribe((res) => {
      this.loadingButton = res;
    });
    const role = localStorage.getItem('role');
    switch (role) {
      case 'superAdmin':
        this.router.navigateByUrl('/admin');
        return;
      case 'warehouseManager':
        this.router.navigateByUrl('/manager');
        return;
      case 'warehouseSupervisor':
        this.router.navigateByUrl('/supervisor');
        return;
      default:
        localStorage.clear();
        this.router.navigateByUrl('/auth');
        return;
    }
  }
  inputRequiredValidationsErrors(form: FormGroup, type: string) {
    return inputRequiredValidations(form, type);
  }
  inputPatternValidationsErrors(form: FormGroup, type: string) {
    return PatternValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }
  submitForm() {
    if (this.loginForm.valid) {
      this.loadingButton = true;
      let loginDetails = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.auth.login(loginDetails).subscribe((res: any) => {
        if (res.success) {
          this.loadingButton = false;
          if (
            res.data.role === 'superAdmin' ||
            res.data.role === 'warehouseManager' ||
            res.data.role === 'warehouseSupervisor'
          ) {
            this.localService.setItem('role', res.data.role);
            this.localService.setItem('userId', res.data.userId);
            this.localService.setItem('accessToken', res.data.token);
            this.localService.setItem('refreshToken', res.data.refreshToken);
            this.localService.userId.emit(res.data.userId);
            this.localService.userRole.emit(res.data.role);
            this.loginForm.reset();
          }
          switch (res.data.role) {
            case 'superAdmin':
              this.toastr.success(res.message);
              this.router.navigateByUrl('/admin');
              return;
            case 'warehouseManager':
              this.toastr.success(res.message);
              this.router.navigateByUrl('/manager');
              return;
            case 'warehouseSupervisor':
              this.toastr.success(res.message);
              this.router.navigateByUrl('/supervisor');
              return;
            default:
              this.toastr.error("User doesn't have access");
              localStorage.clear();
              this.router.navigateByUrl('/auth');
              return;
          }
        }
      });
    }
  }
}
