import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { SUPER_ADMIN } from '@/constants';

import {
  // useUpdateUserProfileMutation,
  usersApi,
} from '@/services/superAdmin/user-management/users';
import { enqueueSnackbar } from 'notistack';
import { CommonAPIS } from '@/services/common-APIs';
import { PAGINATION } from '@/config';

const useUserManagement = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState({
    drawer: false,
    type: '',
    data: {},
  });
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [userType, setUserType] = useState();
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [searchVal, setSearchVal] = useState('');
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());
  const [filterValues, setFilterValues] = useState<any>({
    role: '',
    products: '',
    organization: '',
    createdDate: '',
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
  const { useGetProductsQuery, useGetOrganizationsQuery } = CommonAPIS;

  const [updateUsers] = useUpdateUsersMutation();
  const { data: products } = useGetProductsQuery({});
  const { data: organizations } = useGetOrganizationsQuery({});
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleAddRole = () => {
    navigate.push(SUPER_ADMIN?.ADDROLE);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleUsersList = (data: any) => {
    navigate.push({
      pathname: SUPER_ADMIN?.USERS_LIST,
      query: {
        userName: `${data?.firstName} ${data?.lastName}`,
        organizationId: data?.organization?._id,
        userId: data?._id,
      },
    });
    setSelectedValue(null);
  };

  const handleUserSwitchChange = (e: any, id: any) => {
    const status = e?.target?.checked ? 'ACTIVE' : 'INACTIVE';
    updateUsers({ id, body: { status: status } });
    enqueueSnackbar('User updated successfully', {
      variant: 'success',
    });
  };

  const resetFilters = () => {
    setFilterValues({
      role: '',
      products: '',
      organization: '',
      createdDate: null,
    });
  };

  return {
    navigate,
    theme,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
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
    checkedRows,
    setCheckedRows,
    updateUsers,
    products,
    searchVal,
    setSearchVal,
    resetFilters,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    organizations,
    initialTab,
    tabTwo,
    tabOne,
    datePickerVal,
    setDatePickerVal,
  };
};

export default useUserManagement;
