export interface Product {
  _id: number;
  name: string;
}

export interface PlanType {
  _id: number;
  name: string;
}

export interface ComponentProps {
  name: string;
  label: string;
  select?: boolean;
  fullWidth?: boolean;
}

export interface Option {
  value: number;
  label: string;
}

export interface FilterData {
  componentProps: ComponentProps;
  options?: Option[];
  component: React.ElementType;
  md: number;
}

export interface SubmitValues {
  productId?: number;
  planTypeId?: number;
  createdAt?: string;
  plan?: any;
}
