import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { SettingsService } from 'src/app/api/services/settings/settings.service';
import {
  settingsUserObject,
} from 'src/app/common/models/interfaces';
import { AppDialogService } from '../app-dialog/app-dialog.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Output() pageScrollAction = new EventEmitter<any>();
  name = localStorage.getItem('name');
  userDetails: settingsUserObject;
  modalRef: any;
  @Input() activeTab:string=''
  constructor(
    public dialog: AppDialogService
  ) {
 
  }
  ngOnInit(): void {
  }
  // changePassword() {
  //   this.modalRef = this.dialog.open(ChangePasswordComponent, {
  //     data: { title: 'Change Password' },
  //   });
  // }
  // logOut() {
  //   this.router.navigateByUrl('/auth/signIn');
  //   this.localService.clear();
  //   this.toastr.success('Logged out successfully');
  // }
  goToInPageSection(element: string) {
    this.pageScrollAction.emit(element);
  }
}
