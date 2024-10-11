export interface IRequestersProps {
  isAgentConvert?: boolean;
  selectedRequesterList?: any;
  setSelectedRequesterList?: any;
  getRequestersListData?: ((page: number) => void) | any;
  page?: number;
  setIsAgentConvert?: any;
  setPage?: ((page: number) => void) | any;
  totalRecords?: number;
  deleteModalOpen?: boolean;
  setDeleteModalOpen?: (value: boolean) => void;
  selectedRequestersList?: [];
  setIsDrawerOpen?: ((value: boolean) => void) | any;
  handleSearch?: (value: any) => void;
  requestersDropdownOptions?: any;
  isDrawerOpen?: boolean;
  singleRequesterDetails?: any;
  setSelectedRequestersList?: any;
}
