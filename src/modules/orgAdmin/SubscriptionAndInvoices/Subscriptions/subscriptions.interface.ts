export interface PlanI {
  id: string;
  _id: string;
  status: string;
  name?: string;
  productName?: string;
  planDuration: string;
  additionalUsers: number;
  billingCycle: string;
  planData: {
    planPrice: number;
  };
  billingDate: string;
  planTypeName?: string;
  plan?: string;
}

export interface PlanCRMI {
  id: string;
  status: string;
  name?: string;
  planName?: string;
  planDuration: string;
  additionalUsers: number;
  billingCycle: string;
  planPrice?: number;
  plans?: {
    planPrice: number;
  };
  billingDate: string;
  planTypeName?: string;
  _id: string;
}
