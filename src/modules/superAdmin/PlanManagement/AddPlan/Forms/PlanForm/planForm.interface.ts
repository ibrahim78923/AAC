import { ElementType } from 'react';

export interface Option {
  value: string;
  label: string;
}

export interface FormComponentProps {
  name: string;
  select?: boolean;
  [key: string]: any;
}

export interface FormDefaultValuesItem {
  md: number;
  component: ElementType<any> | string;
  componentProps: FormComponentProps;
  options?: Option[];
}

export interface PlanFormState {
  addPlanForm: {
    suite: Option[];
    [key: string]: any;
  };
}

export interface ProductOption {
  _id: string;
  name: string;
}
