export interface ReportsTypesI {
  id: number;
  avatar: JSX.Element | any;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
  findAccount: { hasAccount: boolean; productId: string };
  baseModule: string;
}
