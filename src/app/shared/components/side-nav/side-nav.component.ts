import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  warehouseManagerRoutingUrls,
  superAdminRoutingUrls,
  warehouseSupervisorRoutingUrls,
} from './side-nav.config';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  urls: { url: string; value: string; icon: string }[] = [];
  role: string = '';
  sideBarVisible = true;
  minimizeSidebarStatus = false;
  @Output() minimizeSideBar = new EventEmitter<boolean>();
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role) {
      this.sidenavRoles();
    }
  }
  sidenavRoles() {
    switch (this.role) {
      case 'superAdmin':
        this.urls = superAdminRoutingUrls;
        return;
      case 'warehouseManager':
        this.urls = warehouseManagerRoutingUrls;
        return;
      case 'warehouseSupervisor':
        this.urls = warehouseSupervisorRoutingUrls;
        return;
      default:
        this.router.navigate(['/auth/signIn']);
        this.urls = [];
        localStorage.clear();
        return;
    }
  }

  minimizeSidebar() {
    this.minimizeSidebarStatus = !this.minimizeSidebarStatus;
    this.minimizeSideBar.emit(this.minimizeSidebarStatus);
  }
}
