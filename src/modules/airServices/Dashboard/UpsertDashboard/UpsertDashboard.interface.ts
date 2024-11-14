export interface SpecialUsersFieldsI {
  id: string;
  name?: string;
}

export interface ReportsI {
  visibility: boolean;
  name: string;
  type: string;
}

export interface UpsertServicesDashboardDefaultValueI {
  name: string;
  isDefault: boolean;
  reports: ReportsI[] | string[] | undefined;
  specialUsers: any[] | undefined;
  permissionsUsers: any[] | undefined;
  access: string;
  permissions: string;
}

export interface SpecificUsersAccessFormFieldsDynamicI {
  id: number;
  data: any;
  align?: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  [key: string]: any;
}
