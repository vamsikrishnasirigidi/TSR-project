import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingUrls } from './side-nav.config';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private router: Router,private localService:LocalServiceService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.urls = RoutingUrls;
  }
 logout() {
    this.router.navigateByUrl('/auth/signIn');
    this.localService.clear();
    this.toastr.success('Logged out successfully');
  }
  onResize(){
    return document.body.offsetWidth < 1024;
  }
  gotoDashboard() {
    this.router.navigateByUrl('/');
  }
}
