import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regularExpressions } from 'src/app/common/regularExpressions';
import { AppDialogConfig } from '../app-dialog/app-dialog.config';
import { AppDialogRef } from '../app-dialog/app-dialog.ref';
import { ToastrService } from 'ngx-toastr';
import { PatternValidations, inputRequiredValidations, minLengthValidations } from 'src/app/common/utils';
import { EmailService } from 'src/app/api/services/email/email.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm:FormGroup
  emailValidator = regularExpressions.emailExp;
  buttonLoading:boolean=false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private emailService:EmailService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: [
        '',
        [Validators.pattern(this.emailValidator), Validators.required],
      ],
      message: [''],
      address: [''],
      id: [''],
    });
  }
  inputRequiredValidation(form: FormGroup, type: string): boolean {
    return inputRequiredValidations(form, type);
  }
  inputPatternValidationsErrors(form: FormGroup, type: string): boolean {
    return PatternValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }
  submitForm(){
    this.emailService.sendEmailToEmailJS(this.userForm.value).then((res)=>{
      console.log(res);
    })
  }
}
