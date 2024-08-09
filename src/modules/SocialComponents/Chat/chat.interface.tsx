export interface LogoI {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface ProductI {
  _id: string;
  name: string;
  logo: LogoI;
}

export interface OrganizationI {
  _id: string;
  crn: string;
  name: string;
}

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  products: ProductI[];
  organization: OrganizationI;
  createdAt: string;
  activeProducts: ProductI[];
}
