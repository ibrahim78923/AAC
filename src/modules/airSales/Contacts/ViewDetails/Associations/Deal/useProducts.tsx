import { useTheme } from '@mui/material';
import { useState } from 'react';

const useProducts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectStage, setSelectStage] = useState('');
  const [selectPipline, setSelectPipline] = useState('');

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
    selectPipline,
    setSelectPipline,
    setSelectStage,
    selectStage,
  };
};

export default useProducts;
