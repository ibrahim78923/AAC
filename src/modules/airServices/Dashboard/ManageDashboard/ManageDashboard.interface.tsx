import { Dispatch, SetStateAction } from 'react';

export interface ManageDashboardIsPortalOpenI {
  isDelete?: boolean;
  isOpen?: boolean;
  isView?: boolean;
  isFilter?: boolean;
  isStaticView?: boolean;
  isDynamicPreview?: boolean;
  data?: { [key: string]: any };
}

export interface ManageDashboardPortalComponentPropsI {
  isPortalOpen?: ManageDashboardIsPortalOpenI;
  setIsPortalOpen?: Dispatch<SetStateAction<ManageDashboardIsPortalOpenI>>;
  dashboardFilterLists?: any;
  setDashboardFilterLists?: Dispatch<SetStateAction<any>>;
  setPage?: Dispatch<SetStateAction<number>>;
  page: number;
  totalRecords?: number | undefined;
  getDashboardListData: (currentPage: number) => void;
}

export interface ManageDashboardTableRowI {
  isDefault: boolean;
  name: string;
  ownerDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: {
      url: string;
    };
  };
  access: string;
  lastView: string;
  updatedAt: string;
  actions: any;
}
