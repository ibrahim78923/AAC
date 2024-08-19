import { Dispatch, SetStateAction } from 'react';

export interface TicketsTasksIsPortalOpenI {
  isOpen?: boolean;
  isUpsert?: boolean;
  isDelete?: boolean;
  isView?: boolean;
  isEdit?: boolean;
  type?: string;
  data?: any;
}

export interface TicketsTasksPortalComponentPropsI {
  isPortalOpen: TicketsTasksIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<TicketsTasksIsPortalOpenI>>;
  selectedTasksList: any;
  setSelectedTasksLists: Dispatch<SetStateAction<any>>;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  page: number;
  getTaskListData: (currentPage?: number) => Promise<void>;
}
export interface TicketTasksTableRowI {
  _id: string;
  assignedUser: {
    firstName: string;
    lastName: string;
  };
  title: string;
  status: string;
  startDate: string;
  endDate: string;
}
