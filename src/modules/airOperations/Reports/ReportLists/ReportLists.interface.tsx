import { Dispatch, SetStateAction } from 'react';

export interface ReportListsTableRowI {
  _id?: string;
  owner?: {
    firstName?: string;
    lastName?: string;
    avatar?: {
      url?: string;
    };
  };
  name?: string;
  dashboardDetails?: { name?: string }[] | [];
  type?: string;
  createdAt?: string;
  accessLevel?: { type?: string };
  updatedAt?: string;
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
  getReportListData: (
    currentPage?: number,
    filterReports?: any,
  ) => Promise<void>;
  baseModule: string;
}

export interface ReportsListsPropsI {
  apiQuery: any;
  goBack: any;
  baseModule: string;
  permission: { [key: string]: string };
  filter: any[];
  exportApiQuery: any;
  editReportPath: (reportId: string) => void;
  onRestoreClick: any;
}
