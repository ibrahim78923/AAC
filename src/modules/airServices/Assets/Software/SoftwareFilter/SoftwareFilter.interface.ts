export interface SoftwareFilterValues {
  category?: string | null | undefined;
  createdDate?: string | null | undefined;
  publisher?: string | null | undefined;
  status?: string | null | undefined;
  type?: string | null | undefined;
  updatedDate?: string | null | undefined;
}

export interface SoftwareFilterI {
  setIsOpenFilterDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterValues: React.Dispatch<React.SetStateAction<SoftwareFilterValues>>;
  filterValues: SoftwareFilterValues;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isOpenDrawer: boolean;
}
