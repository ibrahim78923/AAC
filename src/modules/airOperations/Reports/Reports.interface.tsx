export interface ReportsTypesI {
  id: number;
  avatar: JSX.Element;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
  hasAccount: boolean;
  productId: string;
}
