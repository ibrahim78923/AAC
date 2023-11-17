import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { SUPER_ADMIN } from '@/constants';

import {
  useUpdateUserProfileMutation,
  usersApi,
} from '@/services/superAdmin/user-management/users';
import { enqueueSnackbar } from 'notistack';

const useUserManagement = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [userType, setUserType] = useState();
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [search, setSearch] = useState('');
  // imports users API's
  const {
    useGetUsersQuery,
    useUpdateUsersMutation,
    useGetCompaniesCRNQuery,
    useGetUsersByIdQuery,
  }: any = usersApi;

  const [updateUsers] = useUpdateUsersMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const queryParams: any = {};
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleAddRole = () => {
    navigate.push(SUPER_ADMIN?.ADDROLE);
  };

  const handleClose = () => {
    setSelectedValue(null);
    setIsOpenAddUserDrawer(true);
  };

  const handleUsersList = (id: any) => {
    navigate.push({ pathname: SUPER_ADMIN?.USERS_LIST, query: { id: id } });
    setSelectedValue(null);
  };

  const handleUserSwitchChange = (e: any, id: any) => {
    queryParams.status = e?.target?.checked ? 'ACTIVE' : 'INACTIVE';
    updateUsers({ id, ...queryParams });
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
    search,
    setSearch,
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
  };
};

export default useUserManagement;
