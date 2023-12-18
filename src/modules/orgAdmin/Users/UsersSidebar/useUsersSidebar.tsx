import { useState } from 'react';
import { useTheme } from '@mui/material';

const useUsersSidebar = () => {
  const [userStatus, setUserStatus] = useState('active');
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const [isActiveEmp, setIsActiveEmp] = useState(0);
  const theme = useTheme();

  return {
    userStatus,
    setUserStatus,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    isActiveEmp,
    setIsActiveEmp,
    theme,
  };
};

export default useUsersSidebar;
