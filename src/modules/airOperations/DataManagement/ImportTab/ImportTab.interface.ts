export interface ImportTabState {
  selectedTabList: any[];
  page: number;
  pageLimit: number;
  search: string;
  filterValues: Record<string, any>;
  isOpenFilterDrawer: boolean;
}

export interface ImportTabResponseData {
  data: {
    datamanagements: any[];
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

export interface ImportTabI {
  page: number;
  setPage: (page: any) => void;
  pageLimit: number;
  setPageLimit: (limit: any) => void;
  handleSearch: (data: any) => void;
  data: ImportTabResponseData | undefined;
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  setIsOpenFilterDrawer: (open: boolean) => void;
  isOpenFilterDrawer: boolean;
  setFilterValues: (values: Record<string, any>) => void;
  filterValues: Record<string, any>;
  handleDownload: any;
  downloadRef: any;
  loading: boolean;
}

export interface ImportDataRow {
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
