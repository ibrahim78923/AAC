import { useState } from 'react';
import { useTheme } from '@mui/material';

const useUsersSidebar = () => {
  const [userStatus, setUserStatus] = useState('active');
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const theme = useTheme();

  return {
    userStatus,
    setUserStatus,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    theme,
  };
};

export default useUsersSidebar;
