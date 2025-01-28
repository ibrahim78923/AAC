import { ReactNode } from 'react';

export interface CustomGridPropsI {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  customStyles?: any;
  children?: ReactNode;
}

export interface ContainerGridPropsI {
  spacing?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  customStyles?: any;
  children?: ReactNode;
}

export interface FormGridPropsI {
  formFieldsList: any[];
  spacing?: number;
  disabled?: boolean;
  md?: number;
  children?: ReactNode;
}

export interface HeadingFormGridPropsI {
  formFieldsList: any[];
  spacing?: number;
  disabled?: boolean;
  md?: number;
  children?: ReactNode;
}

export interface ListGridPropsI {
  list: any[];
  render: any;
  spacing?: number;
  disabled?: boolean;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
