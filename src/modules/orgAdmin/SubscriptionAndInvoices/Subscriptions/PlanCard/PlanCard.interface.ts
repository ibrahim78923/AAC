export interface PlanCardI {
  status?: string;
  icon: any;
  title: string;
  planDuration?: string;
  planUsers?: number;
  planData?: string;
  price: number;
  billOn: string;
  type?: string;
  handleBillingDetail?: any;
  handleManagePlan?: any;
  id?: string;
  plan?: any;
  isCRM?: any;
}
