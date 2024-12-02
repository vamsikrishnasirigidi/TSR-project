import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/api/services/userManagement/user-management.service';
import {
  createUserDataModel,
  organizationData,
  organizationUpdatedFormData,
  userData,
} from 'src/app/common/models/interfaces';
import { regularExpressions } from 'src/app/common/regularExpressions';
import {
  PatternValidations,
  inputRequiredValidations,
  minLengthValidations,
} from 'src/app/common/utils';
import { AppDialogConfig } from 'src/app/shared/components/app-dialog/app-dialog.config';
import { AppDialogRef } from 'src/app/shared/components/app-dialog/app-dialog.ref';
import {
  managerRoles,
  superAdminRoles,
  supervisorRoles,
} from '../user-management.config';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { debounce } from 'lodash';
import { CountryPhoneCodes } from 'src/app/common/phoneCodes';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrls: ['./user-management-form.component.scss'],
})
export class UserManagementFormComponent {
  userManagementForm: FormGroup;
  submitButtonLabel: string = 'Add';
  errorlist = '';
  organizationsList: any;
  carrierOrgList: any;
  shipperOrgList: any;
  organizationId: any;
  formEmail: any;
  userRole = localStorage.getItem('role');
  emailValidator = regularExpressions.emailExp;
  roles = [];
  showCarrierAndShipper: boolean = true;
  warehouseDataOptions: any;
  buttonLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialog: AppDialogRef,
    private config: AppDialogConfig,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private service: UserManagementService,
    private local: LocalServiceService
  ) {
    this.userManagementForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: [
        '',
        [Validators.pattern(this.emailValidator), Validators.required],
      ],
      role: ['', [Validators.required]],
      carrierAdmin: [''],
      shipperAdmin: [''],
      countryCodes: [{ code: '+1', name: 'United States' }],
      id: [''],
    });
  }

  ngOnInit() {
    this.local.errorLoader.subscribe((res) => {
      this.buttonLoading = res;
    });
    this.organizationId = this.route.snapshot['_routerState'].url.split('/')[5];
    if (
      this.userRole === 'superAdmin' ||
      this.userRole === 'warehouseManager'
    ) {
      this.getOrganizationList(this.organizationId, 'shipper');
      this.getOrganizationList(this.organizationId, 'carrier');
    }
    const record = _.get(this.config, 'data.record', null);
    this.formEmail = record?.email;
    if (record) {
      setTimeout(() => {
        this.userManagementForm.patchValue({
          ...record,
          role: record.roleTypeId,
          contactNumber: record.contactNumber.slice(-10),
          countryCodes: _.find(CountryPhoneCodes, {
            code: record.contactNumber.slice(0, -10)
              ? record.contactNumber.slice(0, -10)
              : '+1',
          }),
        });
        this.userManagementForm.get('email').disable();
        if (record.associatedOrganizationId) {
          if (record.roleTypeId.id === 2) {
            const carrier = this.carrierOrgList.find(
              (role) =>
                role.id === JSON.stringify(record.associatedOrganizationId)
            );
            this.userManagementForm.patchValue({
              carrierAdmin: carrier,
            });
            this.userManagementForm.get('carrierAdmin')?.enable();
          }
          if (record.roleTypeId.id === 3) {
            const shipper = this.shipperOrgList.find(
              (role) =>
                role.id === JSON.stringify(record.associatedOrganizationId)
            );
            this.userManagementForm.patchValue({
              shipperAdmin: shipper,
            });
            this.userManagementForm.get('shipperAdmin')?.enable();
          }
        }
      }, 50);
      this.submitButtonLabel = 'Update';
    }
    switch (this.userRole) {
      case 'superAdmin':
        this.roles = superAdminRoles;
        this.userManagementForm.get('carrierAdmin')?.disable();
        this.userManagementForm.get('shipperAdmin')?.disable();
        return;
      case 'warehouseManager':
        this.roles = managerRoles;
        this.userManagementForm.get('carrierAdmin')?.disable();
        this.userManagementForm.get('shipperAdmin')?.disable();
        return;
      case 'warehouseSupervisor':
        this.roles = supervisorRoles;
        this.showCarrierAndShipper = false;
        return;
      default:
        this.roles = [];
    }
  }
  //required validation
  inputRequiredValidation(form: FormGroup, type: string): boolean {
    return inputRequiredValidations(form, type);
  }
  inputPatternValidationsErrors(form: FormGroup, type: string): boolean {
    return PatternValidations(form, type);
  }
  inputLengthValidationsErrors(form: FormGroup, type: string): boolean {
    return minLengthValidations(form, type);
  }
  cancelForm() {
    this.dialog.close(true);
  }
  submitForm() {
    this.buttonLoading = true;
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      role,
      carrierAdmin,
      shipperAdmin,
      countryCodes,
      id,
    } = this.userManagementForm.value;
    const data = {
      firstName,
      lastName,
      contactNumber: countryCodes.code + contactNumber,
      email: this.formEmail ? this.formEmail : email,
      roleId: role.id,
      userName: null,
      associatedOrganizationId: carrierAdmin
        ? carrierAdmin.id
        : shipperAdmin
        ? shipperAdmin.id
        : null,
      parentOrganizationId: parseInt(this.organizationId),
    };
    if (id) {
      this.service
        .updateUser(data as any, id as number)
        .subscribe((res: any) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.dialog.close(true);
            this.buttonLoading = false;
          }
        });
    } else {
      this.service.createUser(data).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.dialog.close(true);
          this.buttonLoading = false;
        }
      });
    }
  }

  onSelectRole(data) {
    switch (data.value.id) {
      case 2:
        this.getOrganizationList(this.organizationId, 'carrier');
        this.userManagementForm.controls['carrierAdmin'].setValidators([
          Validators.required,
        ]);
        this.userManagementForm.controls[
          'carrierAdmin'
        ].updateValueAndValidity();
        this.userManagementForm.get('shipperAdmin')?.clearValidators();
        this.userManagementForm.get('shipperAdmin')?.updateValueAndValidity();
        this.userManagementForm.get('carrierAdmin')?.enable();
        this.userManagementForm.get('shipperAdmin')?.disable();
        return;
      case 3:
        this.getOrganizationList(this.organizationId, 'shipper');
        this.userManagementForm.controls['shipperAdmin'].setValidators([
          Validators.required,
        ]);
        this.userManagementForm.controls[
          'shipperAdmin'
        ].updateValueAndValidity();
        this.userManagementForm.get('carrierAdmin')?.clearValidators();
        this.userManagementForm.get('carrierAdmin')?.updateValueAndValidity();
        this.userManagementForm.get('carrierAdmin')?.disable();
        this.userManagementForm.get('shipperAdmin')?.enable();
        return;
      default:
        this.userManagementForm.get('carrierAdmin')?.disable();
        this.userManagementForm.get('shipperAdmin')?.disable();
        this.userManagementForm.get('carrierAdmin')?.setValue(null);
        this.userManagementForm.get('shipperAdmin')?.setValue(null);
        this.userManagementForm.get('carrierAdmin')?.clearValidators();
        this.userManagementForm.get('carrierAdmin')?.updateValueAndValidity();
        this.userManagementForm.get('shipperAdmin')?.clearValidators();
        this.userManagementForm.get('shipperAdmin')?.updateValueAndValidity();
        return;
    }
  }
  getOrganizationList(id, type) {
    // if (this.userRole === 'superAdmin') {
    //   this.affiliateOrgService
    //     .getOrganizationDropdownData(id, type)
    //     .subscribe((res: any) => {
    //       if (res.success) {
    //         const List = res.data.map((obj) => {
    //           return {
    //             name: `${obj.name} (${obj.code})`,
    //             id: `${obj.id}`,
    //           };
    //         });
    //         if (type === 'carrier') {
    //           this.carrierOrgList = List;
    //         } else {
    //           this.shipperOrgList = List;
    //         }
    //       }
    //     });
    // } else {
    //   this.affiliateOrgService
    //     .getManagerOrganizations(type)
    //     .subscribe((res) => {
    //       if (res.success) {
    //         const List = res.data.map((obj) => {
    //           return {
    //             name: `${obj.name} (${obj.code})`,
    //             id: `${obj.id}`,
    //           };
    //         });
    //         if (type === 'carrier') {
    //           this.carrierOrgList = List;
    //         } else {
    //           this.shipperOrgList = List;
    //         }
    //       }
    //     });
    // }
  }
}
