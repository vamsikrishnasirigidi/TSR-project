import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingUrls } from './side-nav.config';

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
    this.urls = RoutingUrls;
  }
}
