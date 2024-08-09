export interface SMSDashboardProps {
  setTabVal: (val: number) => void;
}
export interface DashboardCardsDataInterface {
  sent?: number;
  delivered?: number;
  read?: number;
  replied?: number;
  failed?: number;
  statistics?: string[];
  undelivered?: number;
}

export interface StatusCardsProps {
  analytics?: DashboardCardsDataInterface;
  isDashboard?: boolean;
  isLoading?: boolean;
}
