import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {  Router } from '@angular/router';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
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
  isAdmin:boolean=false;
  @Input() activeTab:string=''
  constructor(
    public dialog: AppDialogService,
    private router: Router,
    private local: LocalServiceService,
  ) {
 
  }
  ngOnInit(): void {
    this.isAdmin=Boolean(this.local.getItem('accessToken'))
  }
  goToInPageSection(element: string) {
    this.pageScrollAction.emit(element);
  }
  goToAdminLogin(){
    this.router.navigateByUrl('/auth/signIn');
  }
}
