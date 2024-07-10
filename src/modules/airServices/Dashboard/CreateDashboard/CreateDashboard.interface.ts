import { ReactNode } from 'react';

export interface AutoCompleteLabelI {
  name: string;
  id: string;
  description?: string;
}

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
  permissions: 'view' | 'view_and_edit';
}

export interface UsersDropdownOptionI {
  firstName: string;
  lastName: string;
  _id: string;
  [key: string]: any;
}

export interface SpecificUsersAccessColumnsI {
  label: string;
  _id: string;
}
export interface SpecificUsersAccessFormFieldsDynamicI {
  id: number;
  data: any;
  align?: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  [key: string]: any;
}

export interface ComponentProps {
  name?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  display?: string;
  justifyContent?: string;
  flexWrap?: string;
  gap?: number;
  row?: boolean;
  options?: {
    value: string;
    label: string;
    filter?: ReactNode;
  }[];
  multiple?: boolean;
  size?: string;
  externalParams?: {
    productId: string;
  };
  getOptionLabel?: (option: UsersDropdownOptionI) => string;
}

export interface UpsertServiceDashboardFormFieldsDynamicI {
  id: number;
  md?: number;
  componentProps: ComponentProps;
  component: React.ComponentType<any>;
  heading?: ReactNode;
}

export interface MultiCheckboxOptionI {
  label: string;
  value?: string;
}
