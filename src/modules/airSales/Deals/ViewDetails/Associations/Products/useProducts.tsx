import { useState } from 'react';

import { useTheme } from '@mui/material';

const useProducts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedCheckboxes,
    setSelectedCheckboxes,
  };
};

export default useProducts;
