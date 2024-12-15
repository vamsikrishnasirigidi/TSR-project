import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router,public dialog: AppDialogService,) {}
  pageScrollActionHappens(event) {
    if (event === 'enquire') {
      this.modalRef = this.dialog.open(UserFormComponent, {
        data: { title: 'Send Message' },
      });
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
}
