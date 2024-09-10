import { Theme } from '@mui/material/styles';
import { ReactElement } from 'react';

export interface ComponentProps {
  name: string;
  label: string;
  fullWidth: boolean;
  required?: boolean;
  placeholder?: string;
}

export interface DataArrayItem {
  componentProps: ComponentProps;
  component: (props: any) => ReactElement;
  md: number;
}

export interface Row {
  Id?: string;
  _id?: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
}

export interface CellInfo {
  getValue: () => any;
  row: {
    original: Row;
  };
}

export interface Column {
  accessorFn: (row: Row) => any;
  id: string;
  cell?: (info: CellInfo) => ReactElement;
  header?: ReactElement | string;
  isSortable: boolean;
}

export interface ProductCategoryValidationSchema {
  name: string;
  description?: string;
}

export interface ProductCategoryDefaultValI {
  name: string;
  description: string;
}

export interface ColumnsFunctionParams {
  setIsGetRowValues: (value: React.SetStateAction<any>) => void;
  setIsChecked: (value: React.SetStateAction<boolean>) => void;
  isGetRowValues: string[];
  theme: Theme;
  setEditData: (data: Row) => void;
  updateSalesProductCategories: (params: {
    body: { status: string };
    id: string;
  }) => Promise<any>;
}

export type ColumnsFunctionReturnType = Column[];
