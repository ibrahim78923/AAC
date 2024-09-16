export interface ExportTabState {
  selectedTabList: any[];
  page: number;
  pageLimit: number;
  search: string;
  filterValues: Record<string, any>;
  isOpenFilterDrawer: boolean;
}

export interface ExportTabResponseData {
  data: {
    exportedfilelogs: any[];
    meta: {
      page: number;
      pages: number;
      limit: number;
      total: number;
    };
  };
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface ExportTabI {
  page: number;
  setPage: any;
  pageLimit: number;
  setPageLimit: any;
  setSearch: (search: string) => void;
  data: ExportTabResponseData | undefined;
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  setIsOpenFilterDrawer: (open: boolean) => void;
  isOpenFilterDrawer: boolean;
  setFilterValues: (values: Record<string, any>) => void;
  filterValues: Record<string, any>;
  listDataExport: any;
}

export interface ExportDataRow {
  _id: string;
  user: {
    profileImg: { src: string };
    name: string;
  };
  fileName: string;
  product: string;
  object: string;
  status: string;
  createdAt: string;
}
