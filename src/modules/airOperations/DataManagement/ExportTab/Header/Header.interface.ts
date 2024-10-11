export interface HeaderI {
  handleSearch: (search: any) => void;
  setIsOpenFilterDrawer: React.Dispatch<React.SetStateAction<any>>;
  isOpenFilterDrawer: boolean;
  setFilterValues: (values: Record<string, any>) => void;
  filterValues: Record<string, any>;
  setPage: (page: number) => void;
  handleCsvExport: () => void;
  handleExcelExport: () => void;
}
