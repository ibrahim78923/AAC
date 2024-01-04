import { useState } from 'react';

import { useTheme } from '@mui/material';
import { getSession } from '@/utils';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';

const useContacts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { user } = getSession();

  const searchObj = {
    search: searchName,
    contactOwnerId: user?._id,
  };
  const { data } = useGetContactsQuery({ params: searchObj });

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
    data,
  };
};

export default useContacts;
