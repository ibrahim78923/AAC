import { useState } from 'react';

import { useTheme } from '@mui/material';

const useContacts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  // const { data } = useGetContactsQuery({});

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
  };
};

export default useContacts;
