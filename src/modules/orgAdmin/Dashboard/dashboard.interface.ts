export interface AccountsDataLogoI {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface AccountsDataCompanyI {
  _id: string;
  accountName: string;
}

export interface AccountsDataAccountI {
  _id: string;
  user: string;
  company: AccountsDataCompanyI;
  role: string;
  status: 'ACTIVE' | 'INACTIVE'; // Assuming there could be other statuses
  isActive: boolean;
}

export interface AccountsDataProductI {
  _id: string;
  name: string;
  logo: AccountsDataLogoI;
  accounts: AccountsDataAccountI[];
}

export interface LogoI {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface ProductI {
  color: any;
  _id: string;
  name: string;
  description: string;
  logo: LogoI;
  status: 'active' | 'inactive';
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  isChild: boolean;
}
