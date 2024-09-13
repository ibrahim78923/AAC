import { ReactNode } from 'react';

export interface ApiErrorStatePropsI {
  height?: string;
  textColor?: string;
  message?: string;
  children?: ReactNode;
  refresh?: (...args: any) => Promise<void> | any;
  canRefresh?: boolean;
  refreshButtonProps?: any;
}
