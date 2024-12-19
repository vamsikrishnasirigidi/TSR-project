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
  async submitForm() {
    if (this.loginForm.valid) {
      try {
        this.loadingButton = true;
        const loginDetails = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        
        const userCredential = await this.fireAuth.signInWithEmailAndPassword(
          loginDetails.email, 
          loginDetails.password
        );
        
        if (userCredential.user) {
          const accessToken = userCredential.user.multiFactor['user'].accessToken;
          
          // Get user details
          const userDetailsSubscription = this.firebaseService
            .getDocument('users', loginDetails.email)
            .subscribe({
              next: (res) => {
                this.localService.setItem('user_details', JSON.stringify(res.data));
                this.localService.setItem('accessToken', accessToken);
                this.router.navigateByUrl('/admin');
                this.toastr.success('Logged in successfully');
              },
              error: (error) => {
                this.toastr.error('Error fetching user details');
                console.error(error);
              },
              complete: () => {
                this.loadingButton = false;
              }
            });
        }
      } catch (error) {
        this.toastr.error(error.message);
        this.loadingButton = false;
      }
    }
  }
  getLoginDetails(email) {
    let userData;
    this.firebaseService.getDocument('users', email).subscribe((res) => {
      userData = res.data;
      return userData; 
    });
    return userData; 
  }
}
