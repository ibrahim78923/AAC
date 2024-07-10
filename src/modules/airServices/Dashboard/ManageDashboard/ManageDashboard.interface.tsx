export interface IsPortalOpenI {
  isDelete: boolean;
  isOpen: boolean;
  isView: boolean;
  isFilter: boolean;
  data: { [key: string]: any };
}

export interface PortalComponentPropsI {
  isPortalOpen: IsPortalOpenI;
  setIsPortalOpen: React.Dispatch<React.SetStateAction<any>>;
  dashboardFilterLists: any;
  setDashboardFilterLists: React.Dispatch<React.SetStateAction<any>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalRecords?: number | undefined;
  getDashboardListData: any;
}
