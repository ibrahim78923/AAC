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
  getTaskListData: any;
}
