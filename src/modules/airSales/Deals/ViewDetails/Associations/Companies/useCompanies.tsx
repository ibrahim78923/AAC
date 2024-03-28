import { useState } from 'react';

import { useTheme } from '@mui/material';

const useCompanies = () => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  return {
    theme,
    openDrawer,
    isOpenAlert,
    setOpenDrawer,
    setIsOpenAlert,
    handleCloseAlert,
  };
};

export default useCompanies;
