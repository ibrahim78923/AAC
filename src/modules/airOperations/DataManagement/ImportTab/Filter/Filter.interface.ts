import { Dispatch, SetStateAction } from 'react';

export interface FilterI {
  setIsOpenFilterDrawer: Dispatch<SetStateAction<boolean>>;
  setFilterValues: Dispatch<SetStateAction<any>>;
  filterValues: any;
  setPage: (page: number) => void;
  isOpenFilterDrawer: boolean;
}
