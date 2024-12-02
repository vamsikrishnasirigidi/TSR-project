import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PatternValidations,
  inputRequiredValidations,
  minLengthValidations,
} from 'src/app/common/utils';
import { AppDialogService } from 'src/app/shared/components/app-dialog/app-dialog.service';
import { UploadLogoComponent } from './upload-logo/upload-logo.component';
import { SettingsService } from 'src/app/api/services/settings/settings.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {
  settingsOrganizationObject,
  settingsOrganizationResponse,
  settingsUpdateUserResponse,
  settingsUserObject,
  settingsUserResponse,
} from 'src/app/common/models/interfaces';
import { regularExpressions } from 'src/app/common/regularExpressions';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { CountryPhoneCodes } from 'src/app/common/phoneCodes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  organizationForm: FormGroup;
  userForm: FormGroup;
  modalRef: any;
  submitButtonLabel: string = 'Save';
  emailValidator = regularExpressions.emailExp;
  errorList: string[] = [''];
  userRole: string = localStorage.getItem('role');
  editOrgDetails: boolean = false;
  editPersonalDetails: boolean = false;
  organizationDetails: settingsOrganizationObject;
  personalDetails: settingsUserObject;
  organizationUploadLogo: Blob;
  userUploadLogo: Blob;
  loadingPage: boolean = false;
  buttonLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialog: AppDialogService,
    private service: SettingsService,
    private toastr: ToastrService,
    private local: LocalServiceService
  ) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailValidator)],
      ],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      website: [''],
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(5)]],
      logo: [''],
      countryCodes: [{ code: '+1', name: 'United States' }],
      id: [''],
    });
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailValidator)],
      ],
      id: [''],
      logo: [''],
      countryCodes: [{ code: '+1', name: 'United States' }],
      roleTypeId: [''],
    });
  }
  ngOnInit() {
    this.local.errorLoader.subscribe((res) => {
      this.buttonLoading = res;
    });
    this.loadingPage = true;
    if (this.userRole === 'warehouseManager') {
      this.getOrganizationDetails();
    }
    this.getUserDetails();
  }
  getOrganizationDetails() {
    this.loadingPage = true;
    this.service
      .getOrganizationDetails()
      .subscribe((res: settingsOrganizationResponse) => {
        this.organizationDetails = res.data;
        this.organizationForm.patchValue({
          ...this.organizationDetails,
          contactNumber: this.organizationDetails.contactNumber.slice(-10),
          countryCodes: _.find(CountryPhoneCodes, {
            code: this.organizationDetails.contactNumber.slice(0, -10)
              ? this.organizationDetails.contactNumber.slice(0, -10)
              : '+1',
          }),
        });
        this.organizationForm.disable();
        this.loadingPage = false;
      });
  }
  getUserDetails() {
    this.loadingPage = true;
    this.service.getUserDetails().subscribe((res: settingsUserResponse) => {
      let role =
        res.data.roleTypeId === 4
          ? 'Warehouse Manager'
          : res.data.roleTypeId === 5
          ? 'Warehouse Supervisor'
          : res.data.roleTypeId === 1
          ? 'Super Admin'
          : res.data.roleTypeId === 2
          ? 'Carrier Admin'
          : res.data.roleTypeId === 3
          ? 'Shipper Admin'
          : '';
      this.personalDetails = _.set(res.data, 'userRole', role);
      this.userForm.patchValue({
        ...this.personalDetails,
        contactNumber: this.personalDetails.contactNumber.slice(-10),
        countryCodes: _.find(CountryPhoneCodes, {
          code: this.personalDetails.contactNumber.slice(0, -10)
            ? this.personalDetails.contactNumber.slice(0, -10)
            : '+1',
        }),
      });
      this.userForm.disable();
      this.loadingPage = false;
    });
  }
  inputRequiredValidationsErrors(form: FormGroup, type: string): boolean {
    return inputRequiredValidations(form, type);
  }
  inputpatternValidationsErrors(form: FormGroup, type: string): boolean {
    return PatternValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }

  onUploadOrgLogo(event) {
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png' ||
      event.target.files[0].type === 'image/jpg'
    ) {
      this.editOrgDetails = true;
      this.organizationForm.enable();
      this.userForm.get('email').disable();
      const file = event.target.files[0];
      this.organizationUploadLogo = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.organizationDetails.logo = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    } else {
      this.toastr.error('Please select a valid image');
      event.target.value = '';
    }
  }
  onUploadPersonalLogo(event) {
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png' ||
      event.target.files[0].type === 'image/jpg'
    ) {
      this.userForm.enable();
      this.editPersonalDetails = true;
      const file = event.target.files[0];
      this.userUploadLogo = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.personalDetails.logo = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
      event.target.value = '';
    } else {
      this.toastr.error('Please select a valid image');
      event.target.value = '';
    }
  }
  editAccountInformation() {
    this.editOrgDetails = true;
    this.organizationForm.enable();
  }
  editPersonalInformation() {
    this.editPersonalDetails = true;
    this.userForm.enable();
    this.userForm.get('email').disable();
  }
  cancelAccountForm() {
    this.organizationForm.disable();
    this.getOrganizationDetails();
    this.editOrgDetails = false;
    this.organizationUploadLogo = null;
  }
  submitAccountForm() {
    this.buttonLoading = true;
    const {
      name,
      code,
      email,
      contactNumber,
      website,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      country,
      zipcode,
      countryCodes,
      id,
    } = this.organizationForm.value;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('email', email);
    formData.append('contactNumber', countryCodes.code + contactNumber);
    formData.append('website', website);
    formData.append('addressLineOne', addressLineOne);
    formData.append('addressLineTwo', addressLineTwo);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('zipcode', zipcode);
    formData.append(
      'logo',
      this.organizationUploadLogo
        ? this.organizationUploadLogo
        : this.organizationDetails.logo
        ? this.organizationDetails.logo
        : null
    );
    this.service
      .updateOrganizationDetails(formData)
      .subscribe((res: settingsOrganizationResponse) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.getOrganizationDetails();
          this.organizationForm.disable();
          this.organizationUploadLogo = null;
          this.editOrgDetails = false;
          this, (this.buttonLoading = false);
        }
      });
  }
  cancelPersonalForm() {
    this.userForm.disable();
    this.getUserDetails();
    this.editPersonalDetails = false;
    this.userUploadLogo = null;
  }
  submitPersonalForm() {
    this.buttonLoading = true;
    const { firstName, lastName, contactNumber, countryCodes, id } =
      this.userForm.value;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('contactNumber', countryCodes.code + contactNumber);
    formData.append('email', this.personalDetails.email);
    formData.append(
      'logo',
      this.userUploadLogo
        ? this.userUploadLogo
        : this.personalDetails.logo
        ? this.personalDetails.logo
        : null
    );
    this.service
      .updateUserDetails(formData)
      .subscribe((res: settingsUpdateUserResponse) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.service.logoChanges.emit(true);
          this.getUserDetails();
          this.userForm.disable();
          this.userUploadLogo = null;
          this.editPersonalDetails = false;
          this.buttonLoading = false;
        }
      });
  }
}
