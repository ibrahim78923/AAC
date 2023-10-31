import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { SUPER_ADMIN } from '@/constants';

const useUserManagement = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [search, setSearch] = useState('');

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleAddRole = () => {
    navigate.push(SUPER_ADMIN.ADDROLE);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleUsersList = () => {
    navigate.push(SUPER_ADMIN.USERS_LIST);
    setSelectedValue(null);
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
    search,
    setSearch,
    handleClick,
    handleAddRole,
    handleClose,
    handleUsersList,
  };
};

export default useUserManagement;
