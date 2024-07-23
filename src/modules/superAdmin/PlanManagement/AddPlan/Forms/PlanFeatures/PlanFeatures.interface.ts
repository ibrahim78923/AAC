export interface CheckboxItemI {
  name: string;
  _id: string;
  checked: boolean;
}

export interface Feature {
  _id: string;
  name: string;
}
export interface Product {
  _id: string;
  name: string;
}
export interface PlanManagementState {
  addPlanForm: {
    suite?: string[];
    productId?: string[];
  };
}
