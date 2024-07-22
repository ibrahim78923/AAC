import { ReactNode } from 'react';

export interface HeaderItemI {
  name: string;
  icon: ReactNode;
}

export interface ComponentPropsI {
  name: string;
  label: string;
  fullWidth: boolean;
  select?: boolean;
  value?: any;
  required?: boolean;
  placeholder?: string;
  toggle?: string;
  type?: string;
  color?: string;
  styleButton?: string;
}

export interface OptionI {
  value: string;
  label: string;
}

export interface SideBarItemI {
  componentProps: ComponentPropsI;
  options?: OptionI[];
  component: any;
  md: number;
}
