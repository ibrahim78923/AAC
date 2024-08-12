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

export interface ISelectedRolesList extends Array<string | number> {}

export interface IIsPortalOpen {
  isDelete?: boolean;
  [key: string]: boolean | undefined;
}

export interface ICloseMenu {
  (): void | undefined | any;
}

export interface IRole {
  _id?: string;
}

export interface IRolesAndRightColumns {
  _id: string;
  name?: string;
  createdAt?: string;
  description?: string;
}
