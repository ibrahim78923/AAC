import { Dispatch, SetStateAction } from 'react';

export interface FilterI {
  setIsOpenFilterDrawer: Dispatch<SetStateAction<boolean>>;
  setFilterValues: Dispatch<SetStateAction<any>>;
  filterValues: any;
  setPage: (page: any) => void;
  isOpenFilterDrawer: boolean;
}

export interface UsersDropdownOptionsI {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  _id: string;
  name: string;
  permission: string;
  userId: string;
}
