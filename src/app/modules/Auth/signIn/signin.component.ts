import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  inputRequiredValidations,
  minLengthValidations,
} from 'src/app/common/utils';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';

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
    private fireAuth: AngularFireAuth,
    private firebaseService:FirebaseService
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
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.router.navigateByUrl('/admin');
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
      this.fireAuth.signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => { 
        console.log(userCredential);
        const accessToken = userCredential.user.multiFactor['user'].accessToken;
        this.loadingButton = false;
        const userDetails= this.getLoginDetails(loginDetails.email);
        this.localService.setItem('user_details',JSON.stringify(userDetails));
        this.localService.setItem('accessToken', accessToken);
        this.router.navigateByUrl('/admin');
        this.toastr.success('Logged in successfully');
      })
      .catch((error) => {
        this.toastr.error(error.message);
        this.loadingButton = false;
      });
    }
  }
  getLoginDetails(email) {
    this.firebaseService.getDocument('users',email).subscribe((res) => {
    return res.data
    })
  }
}
