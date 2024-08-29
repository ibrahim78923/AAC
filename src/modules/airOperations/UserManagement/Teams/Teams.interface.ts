import { Dispatch, SetStateAction } from 'react';

export interface TeamListI {
  id: number;
  teamName: string;
  teamMembers: number;
  actions: any;
}

export interface TeamIsPortalOpenI {
  isOpen?: boolean;
  isView?: boolean;
  isUpsert?: boolean;
  isDelete?: boolean;
  data?: { [key: string]: any };
}
export interface TeamPortalComponentPropsI {
  isPortalOpen: TeamIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<TeamIsPortalOpenI>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  pageLimit: number;
  setPageLimit: Dispatch<SetStateAction<number>>;
  getOperationsTeamsLists: (currentPage: number) => Promise<void>;
}

export interface TeamsTableRowI {
  name?: string;
  teamMembers?: string;
  actions?: string;
}
