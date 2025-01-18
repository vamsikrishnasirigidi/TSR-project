import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/api/services/firebase/firebase.service';
import { AppDialogService } from 'src/app/shared/components/app-dialog/app-dialog.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clientsConfig = {
    columns: [
      { field: 'sNo', header: 'S.No', maxwidth: '70px', minwidth: '40px' },
      {
        field: 'name',
        header: 'Name',
        maxwidth: '240px',
        minwidth: '110px',
      },
      {
        field: 'contactNumber',
        header: 'Contact Number',
        maxwidth: '240px',
        minwidth: '160px',
      },
      {
        field: 'email',
        header: 'Email',
        maxwidth: '240px',
        minwidth: '100px',
      },
      {
        field: 'address',
        header: 'Address',
        maxwidth: '240px',
        minwidth: '120px',
      },
      {
        field: 'message',
        header: 'Message',
        maxwidth: '240px',
        minwidth: '100px',
      },

      {
        header: 'Actions',
        type: 'actions',
        actions: [
          {
            type: 'delete',
            text: 'Delete',
            icon: 'fa-solid fa-trash delete-icon-table',
            toolTip: 'Delete',
          },
        ],
      },
    ],
  };
  clientsData;
  tableLoader: boolean = false;
  modalRef: any;
  constructor(
    public dialog: AppDialogService,
    private firebaseService: FirebaseService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getClients();
  }
  actionFromTable(value): void {
    switch (value.type) {
      case 'delete': 
        this.delete(value.rowData);
        return;
    }
  }
  getClients() {
    this.tableLoader = true;
    this.firebaseService.getAllDocuments('clients').subscribe((res) => {
      this.tableLoader = false;
      this.clientsData = {
        records: res.map((data, i) => {
          return {
            sNo: i + 1,
            ...data,
          };
        }),
      };
    });
  }
  delete(data) {
    this.modalRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete User',
        service: this.firebaseService,
        userId: 'clients',
        id: data.id,
        methodToCall: 'deleteDocument',
        message: 'Are you sure, you want to delete this user ?',
      },
    });
    this.modalRef.afterClosed.subscribe((result) => {
      if (result) {
        this.getClients();
      }
    });
  }
}
