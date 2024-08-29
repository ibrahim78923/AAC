import { Dispatch, SetStateAction } from 'react';

export interface SingleDashboardComponentPropsI {
  data?: any;
  ticketType?: string;
  setTicketType?: Dispatch<SetStateAction<string>>;
  departmentId?: any;
  setDepartmentId?: Dispatch<SetStateAction<any>>;
  isPreviewMode?: boolean;
  getSingleDashboardData?: () => Promise<void>;
}
