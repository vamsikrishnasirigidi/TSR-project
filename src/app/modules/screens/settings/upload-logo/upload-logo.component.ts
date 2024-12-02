import { Component } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/api/services/settings/settings.service';
import { AppDialogConfig } from 'src/app/shared/components/app-dialog/app-dialog.config';
import { AppDialogRef } from 'src/app/shared/components/app-dialog/app-dialog.ref';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.scss'],
})
export class UploadLogoComponent {
  imageSrcUrl: string = '';
  type: string;
  uploadFormImage: Blob;
  constructor(
    public config: AppDialogConfig,
    private dialog: AppDialogRef,
    private service: SettingsService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.imageSrcUrl = _.get(this.config, 'data.logoImage', null);
    this.type = _.get(this.config, 'data.type', null);
  }
  uploadLogoImage(event) {
    const file = event.target.files[0];
    this.uploadFormImage = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrcUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  removeLogoImage() {
    this.imageSrcUrl = null;
  }
  cancelForm() {
    this.dialog.close(true);
  }
  submitForm() {
    const formData = new FormData();
    formData.append('file', this.uploadFormImage);
    // if (this.type === 'organization') {
    //   this.service.updateOrganizationProfilePic(formData).subscribe((res) => {
    //     this.toastr.success(res.message);
    //     this.dialog.close(true);
    //   });
    // } else {
    //   this.service.updateUserProfilePic(formData).subscribe((res) => {
    //     this.toastr.success(res.message);
    //     this.dialog.close(true);
    //   });
    // }
  }
}
