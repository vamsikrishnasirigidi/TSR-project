export class organizationFormData {
  name: string;
  code: string;
  organizationTypeId: number;
  email: string;
  contactNumber: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  logo: string;
  parentOrganization: boolean;
}
export class organizationUpdatedFormData {
  name: string;
  code: string;
  organizationTypeId: number;
  email: string;
  contactNumber: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  logo: string;
  id: number;
}
export class organizationType {
  name: string;
  id: number;
}
export class organizationModel {
  success: boolean;
  message: string;
  data: organizationUpdatedFormData | null;
  status: string;
  statusCode: number;
}
export class metaData {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  recordCount: number;
}export class getOrganizations {
  data: organizationUpdatedFormData[];
  message: string | null;
  status: string;
  statusCode: number;
  success: boolean;
}

// export class userData {
//   contactNumber: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   // roleTypeId: { id: number; role: string };
//   id: number;
//   userName: string;
// }

export class userDataModel {
  data: userData;
  metaData: metaData;
}
export class organizationResponseData {
  name: string;
  code: string;
  organizationTypeId: number;
  email: string;
  contactNumber: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  logo: string;
  id: number;
  organizationTypeName: string;
}
export class organizationDetailsResponse {
  data: organizationResponseData | null;
  message: string | null;
  status: string;
  statusCode: number;
  success: boolean;
}

export class userRecordsData {
  metaData: metaData;
  records: userData[];
}

export class organizationData{
  data:{
    metaData: metaData;
    organizations: organizationUpdatedFormData[]

  }
  message: string | null;
  status: string;
  statusCode: number;
  success: boolean;
}

export class createUserDataModel {
  data: {
    contactNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    roleTypeId: number;
    id: number;
    userName: string;}
  message: string | null;
  status: string;
  statusCode: number;
  success: boolean;
}
export class settingsOrganizationObject {
  id?: number;
  name: string;
  code: string;
  email: string;
  contactNumber: string;
  website: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  organizationTypeId?: number;
  organizationTypeName?: string;
  logo?: null | string;
}
export class settingsOrganizationResponse {
  success: boolean;
  message: null | string;
  statusCode: number;
  status: string;
  data: settingsOrganizationObject;
}
export class settingsUserObject {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  contactNumber: string;
  roleTypeId: number;
  logo: null | string;
  organizationId: number;
  warehouseId: number;
  userRole?: string;
}
export class settingsUserResponse {
  success: boolean;
  message: null | string;
  statusCode: number;
  status: string;
  data: settingsUserObject;
}
export class settingsUserUpdateObject {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  logo?: null | string;
}
export class settingsUpdateUserResponse {
  success: boolean;
  message: null | string;
  statusCode: number;
  status: string;
  data: settingsUserUpdateObject;
}

export interface ImageData {
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}
export interface userData {
  lastName: string;
  firstName: string;
  email: string;
  contactNumber: number;
}