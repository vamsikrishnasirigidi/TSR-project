import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { AppDialogService } from 'src/app/shared/components/app-dialog/app-dialog.service';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activeTab: string = '';
  modalRef: any;
  mainImageData: any = {
    url: '',
    uploadedAt: '',
    uploadedBy: '',
  };
  siteImageData: any = {
    url: '',
    uploadedAt: '',
    uploadedBy: '',
  };
  defaultFirstImage = '../../../../assets/home-page/real estate.png';
  defaultPlotImage = '../../../../assets/home-page/Kanimella Final.png';
  constructor(
    private router: Router,
    public dialog: AppDialogService,
    private firebaseService: FirebaseService
  ) {}
  ngOnInit(): void {
    this.getHomePageData();
    setTimeout(() => {
      this.openUserForm();
    }, 10000);
  }
  getHomePageData() {
    this.firebaseService.getAllDocuments('homeLayout').subscribe((data) => {
      if (data.length > 0) {
        data.map((item) => {
          if (item.id === 'homeImage') {
            this.mainImageData = item;
          } else if (item.id === 'siteLayout') {
            this.siteImageData = item;
          }
        });
      }
      // this.activeTab = data[0].homeLayout
    });
  }
  pageScrollActionHappens(event) {
    if (event === 'enquire') {
      this.openUserForm();
    } else {
      this.router.navigate([], { fragment: event });
      document.getElementById(event).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      this.activeTab = event;
    }
  }
  openUserForm() {
    this.modalRef = this.dialog.open(UserFormComponent, {
      data: { title: 'Send Message' },
    });
  }
}
