export interface BillingDetailI {
  open: boolean;
  onClose: () => void;
  subscriptionId?: any;
}

export interface PlanCalculationI {
  additionalUsers: number;
  additionalStorage: number;
  perUserPrice: number;
  perStoragePrice: number;
}

export interface PlanDetailsI {
  plans: any;
  planPrice: number;
  planDiscount: number;
  plantypes: string;
}

export interface InvoiceI {
  details: PlanDetailsI;
  billingDate: string;
  dueDate: string;
  status: string;
}

export interface ParsedManageDataI {
  productName?: string;
  planName?: string;
  planData?: {
    defaultUsers: number;
    defaultStorage: number;
  };
  additionalUsers: number;
  additionalStorage: number;
}

export interface InvoiceCardPropsI {
  productName: string;
  planType: string;
  billingCycle: string;
  billingDate: string;
  dueDate: string | null;
  planPrice: number;
  defaultUsers: number;
  defaultStorage: number;
  additionalUser: number;
  additionalStorage: number;
  additionalPerUserPrice: number;
  additionalStoragePrice: number;
  calculatedUserPrice: number;
  calculatedStoragePrice: number;
  planDiscount: number;
  discount: any;
  tax: any;
  subTotal: string;
  totalCost: any;
  payment: string;
}
