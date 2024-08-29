import { Dispatch, SetStateAction } from 'react';

export interface RestoreReportListsIsPortalOpenI {
  isOpen?: boolean;
  isRestore?: boolean;
  isDelete?: boolean;
  isFilter?: boolean;
}

export interface RestoreReportsListsComponentPropsI {
  isPortalOpen: RestoreReportListsIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<RestoreReportListsIsPortalOpenI>>;
  setSelectedReportLists: Dispatch<SetStateAction<any>>;
  selectedReportLists: any;
  reportFilters: any;
  setReportFilter: Dispatch<SetStateAction<any>>;
  getRestoreReportsList: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
}

export interface RestoreReportsListsPropsI {
  apiQuery: any;
  goBack: any;
  baseModule: string;
  permissions: string[];
  filter?: any;
}

export interface RestoreReportListsTableRowI {
  _id?: string;
  deletedAt?: string;
  deletedBy?: string;
  name?: string;
}
