import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { settingsUserObject } from 'src/app/common/models/interfaces';
import { AppDialogService } from '../app-dialog/app-dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Output() pageScrollAction = new EventEmitter<any>();
  @Input() activeTab: string = '';
  
  name = localStorage.getItem('name');
  userDetails: settingsUserObject;
  modalRef: any;
  isAdmin: boolean = false;
  isMobileMenuOpen: boolean = false;

  constructor(
    public dialog: AppDialogService,
    private router: Router,
    private local: LocalServiceService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = Boolean(this.local.getItem('accessToken'));
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToInPageSection(element: string) {
    this.pageScrollAction.emit(element);
    this.isMobileMenuOpen = false; // Close mobile menu after selection
  }

  goToAdminLogin() {
    this.router.navigateByUrl('/auth/signIn');
    this.isMobileMenuOpen = false; // Close mobile menu after selection
  }
}