export interface EditFormPropsI {
  isOpenDrawer: boolean;
  onClose: (value: boolean) => void;
  isEditModal: boolean;
  isGetRowValues: boolean | any;
  setIsGetRowValues: (value: boolean) => void;
  setIsChecked: (value: boolean) => void;
}

export interface UseEditFormI {
  onClose: (value: boolean) => void;
  isEditModal: boolean;
  isGetRowValues: boolean | any;
  setIsGetRowValues: any;
  setIsChecked: (value: boolean) => void;
}

export interface AssignPlanDataItemI {
  md: number;
  component: React.ElementType;
  componentProps: {
    select?: boolean;
    [key: string]: any;
  };
  options?: Array<{
    value: string;
    label: string;
  }>;
}

export interface AssignPlanDataItemOptionI {
  value: string;
  label: string;
}

export interface ErrorWithMessageI {
  data?: {
    message?: string;
  };
}

export interface SubmitValuesI {
  date?: string;
  clientName?: string;
  additionalUser?: any;
  additionalStorage?: any;
  discount?: any;
  billingCycle?: string;
}

export interface Product {
  _id: string;
  name: string;
}

export interface PlanType {
  _id: string;
  name: string;
}

export interface Organization {
  _id: string;
  name: string;
}

export interface GetCRM {
  _id: string;
  name: string;
}

export interface ProductCRMI {
  _id: string;
  name: string;
}
