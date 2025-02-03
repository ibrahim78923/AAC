import { Dispatch, SetStateAction } from 'react';

export interface UsersFilterDataI {
  name?: string;
  department?: string;
  assignedDate?: string;
  firstSeen?: string;
  lastSeen?: string;
}
export interface UsersFilterI {
  isPortalOpen: any;
  setIsPortalOpen: Dispatch<SetStateAction<any>>;
  filterValues: UsersFilterDataI;
  setFilterValues: Dispatch<SetStateAction<UsersFilterDataI>>;
}
