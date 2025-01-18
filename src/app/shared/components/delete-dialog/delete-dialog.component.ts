import { Component } from '@angular/core';
import { AppDialogConfig } from '../app-dialog/app-dialog.config';
import { AppDialogRef } from '../app-dialog/app-dialog.ref';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';

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
  parentId: number;
  methodToCall = 'delete';
  isLoading = false;
  showSubmessage = true;
  submitButtonText = 'Yes, delete';
  loading = false;
  apiCallNotRequired = false;
  ordersDelete=false;
  deleteOrderObj: any;
  attachmentsDelete!: boolean;
  deleteIDs!: number[]
  constructor(
    public config: AppDialogConfig,
    public dialog: AppDialogRef,
    private toastr: ToastrService,
    private local: LocalServiceService
  ) {}

  ngOnInit(): void {
    this.local.errorLoader.subscribe((res) => {
      this.loading = res;
    });
    this.service = this.config.data.service;
    this.id = this.config.data.id;
    this.userId = this.config.data.userId;
    this.parentId = this.config.data.parentId;
    this.deleteOrderObj=this.config.data.deleteOrderObj;
    this.ordersDelete=this.config.data.ordersDelete;
    this.attachmentsDelete = this.config.data?.attachmentsDelete || false;
    if(this.attachmentsDelete) {
      this.deleteIDs = this.config.data?.deleteIDs
    }
    this.showSubmessage =
      this.config.data.showSubMessage === false
        ? this.config.data.showSubMessage
        : true;
    this.submitButtonText = this.config.data.submitButtonText
      ? this.config.data.submitButtonText
      : 'Yes, delete';
    this.apiCallNotRequired = this.config.data.apiCallNotRequired;
    if (!_.isEmpty(this.config.data.message)) {
      this.message = this.config.data.message;
    }
    if (!_.isEmpty(this.config.data.methodToCall)) {
      this.methodToCall = this.config.data.methodToCall;
    }
  }

  onConfirm(): void {
    this.loading = true;
    if (this.apiCallNotRequired) {
      setTimeout(() => {
        this.dialog.close(true);
        this.loading = false;
      }, 1000);
    } else {
      if(this.attachmentsDelete) {
        this.service[this.methodToCall]({orderId: this.id, attachmentIds: this.deleteIDs}).subscribe(
          (response: { success: boolean; message: string }) => {
            if(response?.success) {
              this.dialog.close(true);
              this.loading = false;
            }
          },(error: Error) => {
            this.loading = false;
            this.dialog.close(true);
            this.local.errorLoader.next(true);
          }
        )

        return;
      }
      if (this.parentId) {
        this.service[this.methodToCall](
          this.userId,
          this.id,
          this.parentId
        ).subscribe((response) => {
          if (response.success) {
            this.toastr.success(response.message);
            this.dialog.close(true);
            this.loading = false;
          } else {
            this.errorMessage = response.error.errorMessage;
          }
        });
      }
      else if(this.ordersDelete){
        if(this.ordersDelete){
          this.service[this.methodToCall](this.deleteOrderObj).subscribe(
            (response)=>{
              if(response.success){
                this.toastr.success(response.message);
                this.dialog.close(true);
                this.loading = false;
              }
            }
          )}
      }
       else {
        if (this.userId) {
          this.service[this.methodToCall](this.userId, this.id).then(
            (response) => {
              if (response.success) {
                this.toastr.success(response.message);
                this.dialog.close(true);
                this.loading = false;
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
              this.loading = false;
            } else {
              this.errorMessage = response.error.errorMessage;
            }
          });
        }
      }
    }
  }


  onCancel(): void {
    this.dialog.close(false);
  }
}
