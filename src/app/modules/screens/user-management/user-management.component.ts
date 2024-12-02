import { Component, ViewChild } from '@angular/core';
import { UserManagementFormComponent } from './user-management-form/user-management-form.component';
import { AppDialogService } from 'src/app/shared/components/app-dialog/app-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { warehouseConfiguration } from './user-management.config';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { UserManagementService } from 'src/app/api/services/userManagement/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { userRecordsData } from 'src/app/common/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { debounce } from 'lodash';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  @ViewChild('table') table: TableComponent;
  modalRef: any;
  tableFilter: FormGroup;
  records: any = [];
  warehousesData: any;
  pageNumber: number = 0;
  pageSize: number = 10;
  userRole = localStorage.getItem('role');
  organizationId;
  loading: boolean = false;
  searchText: string = '';
  warehouseConfig = warehouseConfiguration;
  roles = [
    {
      id: 4,
      role: 'Warehouse Manager',
    },
    {
      id: 5,
      role: 'Warehouse Supervisor',
    },
    {
      id: 6,
      role: 'Warehouse Staff',
    },
    {
      id: 2,
      role: 'Carrier Admin',
    },
    {
      id: 3,
      role: 'Shipper Admin',
    },
  ];

  constructor(
    public dialog: AppDialogService,
    public fb: FormBuilder,
    private service: UserManagementService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.searchUsers = debounce(this.searchUsers, 500);
    this.tableFilter = this.fb.group({
      filter: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.organizationId = this.route.snapshot['_routerState'].url.split('/')[5];
    this.getUsers();
  }
  getUsers() {
    this.loading = true;
    this.service
      .getUsers(
        this.organizationId,
        this.pageNumber,
        this.pageSize,
        this.searchText
      )
      .subscribe((res: any) => {
        if (res.success) {
          const updateUsers = res.data.users.map((element) => {
            const matchedRole = this.roles.find(
              (role) => role.id === element.roleTypeId
            );
            return { ...element, roleTypeId: matchedRole };
          });
          const updatedData = {
            records: updateUsers,
            ..._.omit(res.data, 'users'),
          };
          this.warehousesData = updatedData;
          this.loading = false;
        }
      });
  }
  searchUsers(value) {
    this.searchText = value;
    this.pageNumber = 0;
    this.getUsers();
    this.table.meta.pageNumber = 0;
    this.table.pageChange();
  }
  addUser() {
    this.modalRef = this.dialog.open(UserManagementFormComponent, {
      data: { title: 'Add User' },
    });
    this.modalRef.afterClosed.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
  actionFromTable(value): void {
    switch (value.type) {
      case 'edit':
        this.editUser(value.data);
        return;
      case 'delete':
        this.delete(value.rowData);
        return;
      case 'pagination':
        this.pageNumber = value.data.page;
        this.getUsers();
    }
  }
  editUser(id) {
    const records = _.get(this.warehousesData, 'records', []);
    const record = _.find(records, ['id', id]);
    this.modalRef = this.dialog.open(UserManagementFormComponent, {
      data: { title: 'Edit User', record },
    });
    this.modalRef.afterClosed.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  delete(data) {
    this.modalRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete User',
        service: this.service,
        id:
          this.userRole === 'superAdmin'
            ? this.organizationId
            : data.warehouseId,
        userId: data.id,
        methodToCall: 'deleteOrganizationUser',
        message: 'Are you sure, you want to delete?',
      },
    });
    this.modalRef.afterClosed.subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
