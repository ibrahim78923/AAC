export interface ReportsTypesI {
  id: number;
  avatar: JSX.Element;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
}

export interface RestoreReportsListsPropsI {
  isPortalOpen: any;
  setIsPortalOpen: any;
  setSelectedReportLists: any;
  selectedReportLists: any;
  reportFilters: any;
  setReportFilter: any;
  getRestoreReportsList: any;
  page: number;
  setPage: any;
  totalRecords: number | undefined;
}
