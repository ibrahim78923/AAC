interface IAuthProduct {
  _id?: string | any;
  accounts?: Array<IAuthProductAccount>;
}

interface IAuthProductAccount {
  company?: ICompanyAccount | any;
}

interface ICompanyAccount {
  _id?: string | any;
}

interface IUserOrganization {
  _id?: string | any;
}

export interface IAuth {
  product?: IAuthProduct | any;
  user?: {
    organization?: IUserOrganization | any;
  };
}

export interface IUpsertRolesAndRightFormData {
  name: string;
  description?: string;
  [key: string]: boolean | string | undefined;
}

export interface IPermissionParent {
  subModules?: Array<IPermissionSubModule>;
}

export interface IPermissionSubModule {
  permissions?: Array<IPermissionItem>;
}

export interface IPermissionItem {
  slug?: string;
}

export interface IFormUser {
  [key: string]: string;
}
