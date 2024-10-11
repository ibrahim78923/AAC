export interface IDepartmentsProps {
  setOpenDeleteModal?: (() => void) | any;
  setSelectedDepartment?: (() => void) | any;
  selectedDepartment?: string[] | string | any;
  getDepartmentListData?: (() => void) | any;
  setPage?: (() => void) | any;
  totalRecords?: number;
  page?: number;
  openDeleteModal?: boolean;
  handleAddMember?: (() => void) | any;
  item?: any;
  departmentActionDropdown?: (() => void) | any;
  handleSearch?: (data: any) => void;
  setOpenUpsertModal?: (() => void) | any;
  openUpsertModal?: boolean;
}
