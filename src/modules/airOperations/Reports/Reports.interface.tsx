import { Dispatch, SetStateAction } from 'react';

export interface ReportsTypesI {
  id: number;
  avatar: JSX.Element;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
  hasAccount: boolean;
  productId: string;
}
export interface ReportListsIsPortalOpenI {
  isOpen?: boolean;
  isClone?: boolean;
  isEmail?: boolean;
  isChangeOwner?: boolean;
  isRename?: boolean;
  isDelete?: boolean;
  isFilter?: boolean;
  isAddedToDashboard?: boolean;
  isAccessManage?: boolean;
  isExport?: boolean;
}
export interface ReportsListsComponentPropsI {
  isPortalOpen: ReportListsIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<ReportListsIsPortalOpenI>>;
  setSelectedReportLists: Dispatch<SetStateAction<any>>;
  selectedReportLists: any;
  reportFilters: any;
  setReportFilter: Dispatch<SetStateAction<any>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  getReportListData: any;
  baseModule: string;
}
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
export interface ReportsListsPropsI {
  apiQuery: any;
  goBack: any;
  baseModule: string;
  permission: { [key: string]: string };
  filter: any[];
  exportApiQuery: any;
  editReportPath: any;
  onRestoreClick: any;
}
