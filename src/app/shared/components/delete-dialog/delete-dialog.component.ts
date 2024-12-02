import { Component } from '@angular/core';
import { AppDialogConfig } from '../app-dialog/app-dialog.config';
import { AppDialogRef } from '../app-dialog/app-dialog.ref';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  service;
  message = 'Are you sure, You want to Delete?';
  errorMessage = '';
  id: number;
  userId: number;
  methodToCall = 'delete';
  isLoading = false;
  constructor(
    public config: AppDialogConfig,
    public dialog: AppDialogRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service = this.config.data.service;
    this.id = this.config.data.id;
    this.userId = this.config.data.userId;
    if (!_.isEmpty(this.config.data.message)) {
      this.message = this.config.data.message;
    }
    if (!_.isEmpty(this.config.data.methodToCall)) {
      this.methodToCall = this.config.data.methodToCall;
    }
  }

  onConfirm(): void {
    if (this.userId) {
      this.service[this.methodToCall](this.userId, this.id).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.success(response.message);
            this.dialog.close(true);
          } else {
            this.errorMessage = response.error.errorMessage;
          }
        }
      );
    } else {
      this.service[this.methodToCall](this.id).subscribe((response) => {
        if (response.success) {
          this.toastr.success(response.message);
          this.dialog.close(true);
        } else {
          this.errorMessage = response.error.errorMessage;
        }
      });
    }
  }

  onCancel(): void {
    this.dialog.close(false);
  }
}
