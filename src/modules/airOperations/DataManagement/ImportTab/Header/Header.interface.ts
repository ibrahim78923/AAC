export interface HeaderI {
  handleSearch: (data: any) => void;
  setIsOpenFilterDrawer: React.Dispatch<React.SetStateAction<any>>;
  isOpenFilterDrawer: boolean;
  setFilterValues: (values: Record<string, any>) => void;
  filterValues: Record<string, any>;
  setPage: (page: number) => void;
  handleDownload: any;
  loading: boolean;
}
