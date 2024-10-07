import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ReactNode } from 'react';

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
  getOptionLabel?: (option: AutocompleteAsyncOptionsI) => string;
}
