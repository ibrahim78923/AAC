import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { SUPER_ADMIN } from '@/constants';
import { usersApi } from '@/services/superAdmin/user-management/users';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useGetProductsQuery } from '@/services/common-APIs';
import { NOTISTACK_VARIANTS, PRODUCT_USER_STATUS } from '@/constants/strings';
import { useUpdateRoleRightsMutation } from '@/services/orgAdmin/roles-and-rights';

const useUserManagement = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState({
    drawer: false,
    type: '',
    recordId: '',
  });
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [userType, setUserType] = useState();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [searchVal, setSearchVal] = useState('');
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());
  const [filterValues, setFilterValues] = useState<any>({
    role: '',
    products: {},
    organization: {},
    createdDate: '',
    roleName: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const initialTab = 0;
  const tabOne = 1;
  const tabTwo = 2;

  // imports users API's
  const {
    useGetUsersQuery,
    useUpdateUsersMutation,
    useGetCompaniesCRNQuery,
    useGetUsersByIdQuery,
  }: any = usersApi;

  const [updateUsers] = useUpdateUsersMutation();
  const { data: productsList } = useGetProductsQuery({});

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleAddRole = () => {
    navigate.push({ pathname: SUPER_ADMIN?.ADDROLE, query: { type: 'add' } });
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleUsersList = (recordId: any) => {
    navigate.push({
      pathname: SUPER_ADMIN?.USERS_LIST,
      query: { id: recordId },
    });
    setSelectedValue(null);
  };

  const handleUserSwitchChange = async (e: any, id: string) => {
    const status =
      e?.target?.checked || e?.target?.value === PRODUCT_USER_STATUS?.ACTIVE
        ? PRODUCT_USER_STATUS?.ACTIVE
        : PRODUCT_USER_STATUS?.INACTIVE;
    try {
      await updateUsers({ id, body: { status: status } })?.unwrap();
      enqueueSnackbar('User updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const handleRolesSwitchChange = async (e: any, id: string) => {
    const status =
      e?.target?.checked || e?.target?.value === PRODUCT_USER_STATUS?.ACTIVE
        ? PRODUCT_USER_STATUS?.ACTIVE
        : PRODUCT_USER_STATUS?.INACTIVE;
    try {
      await updateRoleRights({ id, body: { status: status } })?.unwrap();
      enqueueSnackbar('Role updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const resetFilters = () => {
    setFilterValues({
      role: '',
      products: '',
      organization: '',
      createdDate: '',
    });
  };

  return {
    navigate,
    theme,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
    handleRolesSwitchChange,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    selectedValue,
    tabVal,
    setTabVal,
    userType,
    setUserType,
    filterValues,
    setFilterValues,
    handleClick,
    handleAddRole,
    handleClose,
    handleUsersList,
    useGetUsersQuery,
    useGetCompaniesCRNQuery,
    handleUserSwitchChange,
    useGetUsersByIdQuery,
    selectedRow,
    setSelectedRow,
    searchVal,
    setSearchVal,
    resetFilters,
    pageLimit,
    setPageLimit,
    initialTab,
    tabTwo,
    tabOne,
    datePickerVal,
    setDatePickerVal,
    productsList,
    page,
    setPage,
  };
};

export default useUserManagement;
