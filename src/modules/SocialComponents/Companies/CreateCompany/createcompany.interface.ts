export interface createCompanyI {
  _id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface companyFormValuesI {
  noOfEmloyee: string;
  totalRevenue: string;
  domain: string;
  name: string;
  ownerId: string;
  industry: string;
  type?: string;
  city: string;
  postalCode: string;
  address: string;
  description?: string;
  linkedInUrl?: string;
  phone?: string;
}

export interface DrawerItemOptionI {
  value: string;
  label: string;
}

export interface DrawerItemI {
  md: number;
  component: React.ComponentType<any>;
  componentProps: {
    select?: boolean;
    [key: string]: any;
  };
  options?: DrawerItemOptionI[];
}

export interface DataArrayFunction {
  (): DrawerItemI[];
}
