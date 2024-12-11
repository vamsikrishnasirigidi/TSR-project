import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';
import { SettingsService } from 'src/app/api/services/settings/settings.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  showParentOrganizations = false;
  firstName: string = '';
  PersonalInfoView: boolean = true;
  OrdersView: boolean = false;
  WareHouseView: boolean = false;
  ProductsView: boolean = false;
  privileges: any=[]
  constructor(
    private settingsService: SettingsService,
    private local:LocalServiceService
  ) {}
  ngOnInit(): void {
    this.getPriviliges();
    this.getData()
  }
  async getData(){
    const UserData = this.local.getDecryptedData('user_details');
    this.firstName = UserData?.firstName;
  }

  async getPriviliges() {
    this.privileges = await this.local.getDecryptedData('user_priv');
    const checkView = (name: string) => this.privileges.some(privilege => privilege?.name === name);
    this.OrdersView=checkView('Orders')
    this.WareHouseView=checkView('Warehouse')
    this.ProductsView=checkView('Products')
    this.PersonalInfoView=checkView('Settings')
    this.showParentOrganizations=checkView('Organization')
  }
  findSubPrivilegeByName(privileges, targetName) {
    let privilegesArray = Array.isArray(privileges);
    let isPrivilegeObject = typeof privileges === 'object';
    if (privilegesArray && privileges?.length) {
      for (const privilege of privileges) {
        if (privilege.name === targetName) {
          return privilege;
        }
      }
    } else if (isPrivilegeObject) {
      if (privileges.subPrivileges.length) {
        const subPrivilege = this.findSubPrivilegeByName(
          privileges.subPrivileges,
          targetName
        );
        if (subPrivilege) {
          return subPrivilege;
        }
      }
    }
    return null;
  }
}
