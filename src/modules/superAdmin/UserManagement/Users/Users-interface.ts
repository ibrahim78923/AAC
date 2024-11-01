export interface IFilterValues {
  products?: { _id: string };
  organization?: { _id: string };
  createdDate?: string;
  roleName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface IUsersProps {
  checkedRows: string;
  setCheckedRows: (val: any) => void;
  filterValues?: IFilterValues;
  searchVal: string;
  page: number;
  setPage: (page: any) => void;
  pageLimit: number;
  setPageLimit: (limit: any) => void;
  date?: string;
}

export interface RowInterface {
  Id: string;
  _id: string;
  Name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: { name: string };
  activeProducts: { name: string }[];
  status: string;
  createdOn: string;
  createdAt: string;
}

export interface ColumnsProps {
  handleUserSwitchChange: (e: string, id: string) => void;
  checkedRows: string;
  handleCheckboxChange: (e: string, id: string) => void;
  isLoadingStatus: { [key: string]: boolean };
}

export interface AddUserProps {
  isOpenDrawer?:
    | {
        drawer: boolean;
        type: string;
        recordId: string;
      }
    | any;
  onClose?: () => void;
  tabVal?: number;
  isOpenAddUserDrawer?: { isOpen: boolean; type: string } | any;
  setIsOpenAddUserDrawer?: (value: any) => void;
  setIsOpenAdduserDrawer?: (value: any) => void;
  organizationId?: string;
}

export interface UseActionParams {
  tabVal?: number | undefined;
  organizationId?: string | undefined;
  setIsOpenAdduserDrawer?: any;
  setIsOpenAddUserDrawer?: any;
  isOpenAddUserDrawer?: {
    drawer: boolean;
    type: string;
    recordId: string;
  };
}

export interface UseAddUserReturn {
  pathName: string;
  postUsers: any;
  updateUsers: any;
  postUserEmployee: any;
  methods: any;
  handleSubmit: any;
  onSubmit: (values: any) => Promise<void>;
  userDetail: any;
  tabTitle: string;
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
  addressVal: string;
  postUserLoading: boolean;
  userDetailLoading: boolean;
  updateUserLoading: boolean;
  checkedEmailError: boolean;
  postEmployeeLoading: boolean;
  authCompanyLoading: boolean;
}
