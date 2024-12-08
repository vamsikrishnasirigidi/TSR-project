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
import { lastValueFrom } from 'rxjs';
import { SettingsService } from 'src/app/api/services/settings/settings.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loginForm: FormGroup;
  googleTranslateForm: FormGroup;
  errorList: string[] = [''];
  emailValidator = regularExpressions.emailExp;
  loadingButton: boolean = false;
  selectedLanguage;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localService: LocalServiceService,
    private auth: AuthService,
    private settingsService: SettingsService
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
    this.googleTranslateForm = this.fb.group({
      language: [''],
    });
  }
  ngOnInit(): void {
    this.localService.errorLoader.subscribe((res) => {
      this.loadingButton = res;
    });
    // this.selectedLanguage = this.languages[0];
    // setTimeout(() => {
    //   this.updateGoogleTranslateDropdown(this.selectedLanguage.code);
    // }, 500)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.router.navigateByUrl('/home');
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/auth/signIn');
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
          this.localService.setItem('accessToken', res?.data?.token);
          this.localService.setItem('refreshToken', res?.data?.refreshToken);
          this.localService.setItem('newVersion', 'true');
                if(res.success){
                  this.localService.encriptAndStoreData('user_details', res?.data);
                  this.loadingButton = false;
                  this.router.navigateByUrl('/home');
                  this.toastr.success('Logged in successfully');
                }
        }
      });
    }
  }
  updateGoogleTranslateDropdown(languageCode: string) {
    console.log('Updating Google Translate dropdown to:', languageCode);
    const select = document.querySelector(
      '.goog-te-combo'
    ) as HTMLSelectElement;
    if (select) {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
      select.value = languageCode;
      select.dispatchEvent(event);
    } else {
      console.error('Google Translate dropdown not found');
    }
  }
  onSelectLanguage() {
    console.log(this.selectedLanguage);
    this.updateGoogleTranslateDropdown(
      this.selectedLanguage ? this.selectedLanguage.code : 'en'
    );
  }
}
