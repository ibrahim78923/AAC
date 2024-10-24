export interface SignupDataI {
  id: number;
  title: string;
  path?: string;
  icon?: any;
  description: string;
}
export interface TotalMarketingEmailI {
  id: number;
  email: string;
  sent: number;
  clickThroughRate: number;
  deliverRate: number;
  opened: number;
}

export interface FormsTableDataI {
  id: number;
  name: string;
  status: number;
  pageViews: number;
  submissions: number;
  type: string;
}
