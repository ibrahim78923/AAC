export interface IFilterValues {
  products?: { _id: string };
  organization?: { _id: string };
  createdDate?: string;
}

export interface IUsersProps {
  checkedRows: string;
  setCheckedRows: (val: any) => void;
  filterValues: IFilterValues;
  searchVal: string;
  page: number;
  setPage: (page: number) => void;
  pageLimit: number;
  setPageLimit: (limit: number) => void;
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
  Status: string;
  createdOn: string;
  createdAt: string;
}

export interface ColumnsProps {
  handleUserSwitchChange: (e: string, id: string) => void;
  checkedRows: string;
  handleCheckboxChange: (e: string, id: string) => void;
}

export interface AddUserProps {
  isOpenDrawer?: boolean;
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
    type: string;
    data: {
      data: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        address: {
          composite: string;
          flatNumber?: string;
          city?: string;
          country?: string;
          buildingName?: string;
          buildingNumber?: string;
          streetName?: string;
        };
        postCode: string;
        phoneNumber: string;
        jobTitle: string;
        facebookUrl: string;
        linkedInUrl: string;
        organization: {
          crn: string;
          name: string;
        };
        products: Array<{ _id: string }>;
      };
    };
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
}
