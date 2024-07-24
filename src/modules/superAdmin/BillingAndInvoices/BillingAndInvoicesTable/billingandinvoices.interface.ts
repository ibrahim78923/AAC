export interface BillingInvoicesQueryParamsI {
  startDate?: string;
  endDate?: string;
  status?: string;
  searchTerm?: string;

  page: number;
  limit: number;
}

export interface BillingDetailsFiltersI {
  organizationId: string;
  productId: string;
  planTypeId: string;
  status: string;
}

export interface Organization {
  avatar: {
    url: string;
  };
  name: string;
}

export interface UserOrg {
  firstName: string;
  lastName: string;
}

export interface PlanProductI {
  name: string;
}

export interface PlanTypeI {
  name: string;
  _id?: string;
}

export interface Plans {
  planPrice: string;
  defaultUsers: number;
  defaultStorage: string;
}

export interface RowDataI {
  Id: string;
  usersOrg: UserOrg;
  organizations: Organization;
  planProducts: PlanProductI[];
  plantypes: PlanTypeI;
  status: string;
  plans: Plans;
  planDiscount: string;
  additionalUsers: number;
  additionalStorage: string;
  billingDate: string;
  isCRM: boolean;
}

export interface CellInfoI {
  cell: {
    row: {
      original: any;
    };
  };
  getValue: () => any;
  row: {
    original: Partial<RowDataI> & { _id?: string };
  };
}

export interface OrganizationI {
  _id: string;
  name: string;
}

export interface DataItemI {
  md: number;
  component: React.ElementType;
  componentProps: any; // Specify further if possible, e.g., { select?: boolean; [key: string]: any; }
  options?: Array<{ value: string; label: string }>;
}

export interface DataItemOptionI {
  value: string;
  label: string;
}
