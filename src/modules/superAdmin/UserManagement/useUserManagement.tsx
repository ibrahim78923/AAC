import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { SUPER_ADMIN } from '@/constants';

import {
  useUpdateUserProfileMutation,
  usersApi,
} from '@/services/superAdmin/user-management/users';
import { enqueueSnackbar } from 'notistack';
import { CommonAPIS, useGetOrganizationsQuery } from '@/services/common-APIs';

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
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    role: '',
    products: '',
    organization: '',
    createdDate: '',
  });
  // imports users API's
  const {
    useGetUsersQuery,
    useUpdateUsersMutation,
    useGetCompaniesCRNQuery,
    useGetUsersByIdQuery,
  }: any = usersApi;
  const { useGetProductsQuery } = CommonAPIS;

  const [updateUsers] = useUpdateUsersMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
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
        organizationId: data?.organization,
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
    updateUserProfile,
    products,
    organizations,
  };
};

export default useUserManagement;
