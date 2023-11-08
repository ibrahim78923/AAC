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
  landingPage: string;
  publishStatus: number;
  views: number;
  totalSubmission: number;
  type: string;
}
