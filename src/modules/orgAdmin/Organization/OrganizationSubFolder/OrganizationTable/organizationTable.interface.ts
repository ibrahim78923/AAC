import { GridSize, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface ProductI {
  _id: string;
  name: string;
  [key: string]: any;
}

export interface ProductsListI {
  data: ProductI[];
}

export interface StylesI {
  productCard: SxProps<Theme>;
  productItem: SxProps<Theme>;
}

export interface ProductListPropsI {
  name: string;
  _id: string;
  productsList: ProductsListI;
  selectedProducts: string[];
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => void;
  isViewMode: boolean;
  styles: StylesI;
  theme: Theme;
  getProductIcon: (productName: string) => ReactNode;
}

export interface ComponentPropsI {
  name?: string;
  select?: boolean;
  [key: string]: any;
}

export interface OptionI {
  value: string | number;
  label: string;
}

export interface DateArrayItemI {
  md?: GridSize;
  component: React.ComponentType<any>;
  componentProps: ComponentPropsI;
  options?: OptionI[];
}

export interface GetDataPropsI {
  getDateArray?: DateArrayItemI[];
  addressLength?: any[];
  toggle?: (state: boolean) => void;
}
