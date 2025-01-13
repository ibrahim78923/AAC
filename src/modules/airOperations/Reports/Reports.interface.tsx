export interface ReportsTypesI {
  id: number;
  avatar: JSX.Element | Element;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
  findAccount: { hasAccount: boolean; productId: string };
  baseModule: string;
}
