export interface EditFormPropsI {
  isOpenDrawer: boolean;
  onClose: (value: boolean) => void;
  isEditModal: boolean;
  isGetRowValues: boolean;
  setIsGetRowValues: (value: boolean) => void;
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
