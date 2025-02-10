export interface HeaderPropsI {
  isPortalOpen: any;
  setIsPortalOpen: React.Dispatch<React.SetStateAction<any>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  selectedDeviceList: any[];
  setSelectedDeviceList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface DevicesListPropsI {
  isPortalOpen: any;
  setIsPortalOpen: React.Dispatch<React.SetStateAction<any>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  selectedDeviceList: any[];
  setSelectedDeviceList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface RemoveDevicesPropsI {
  isPortalOpen: any;
  setIsPortalOpen: React.Dispatch<React.SetStateAction<any>>;
  totalRecords: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  selectedDeviceList: any[];
  setSelectedDeviceList: React.Dispatch<React.SetStateAction<any[]>>;
  getInstallationListData?: any;
}

export interface AddDevicesPropsI {
  isPortalOpen: any;
  setIsPortalOpen: React.Dispatch<React.SetStateAction<any>>;
}
