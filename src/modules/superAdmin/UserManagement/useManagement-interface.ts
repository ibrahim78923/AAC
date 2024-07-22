import { Dispatch, SetStateAction } from 'react';

export interface ActionButtonProps {
  checkedRows?: string;
  tabVal?: number;
  setIsOpenAddUserDrawer?: any;
}

export interface UsersManagementFiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  tabVal: number;
  setFilterValues: Dispatch<SetStateAction<any>>;
  filterValues: any;
}
