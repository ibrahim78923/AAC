export interface UsersSidebarProps {
  setEmployeeDataById: (id: string) => void;
  setSearchAccount: (account: string) => void;
  employeeDetails: string[];
  setSearchEmployee: (value: string) => void;
  employeeFilter: any;
  setEmployeeFilter: (filter: any) => void;
  resetFilter: () => void;
  handleEmpListPaginationChange: any;
  employeeMetaData: any;
}

export interface FilterUserProps {
  isOpenDrawer: boolean;
  setIsOpenFilterDrawer: (isOpen: boolean) => void;
  employeeFilter: any;
  setEmployeeFilter: (filter: any) => void;
}

export interface AddUserProps {
  isOpenDrawer: boolean;
  onClose: () => void;
  setIsOpenAdduserDrawer: (isOpen: boolean) => void;
}
