import { useState } from 'react';

import { useTheme } from '@mui/material';
// import { PAGINATION } from '@/config';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts/associations';

const useTickets = (contactId: any) => {
  // Get Association Tickets
  const { data: dataGetTickets, isLoading: loadingTickets } =
    useGetContactAssociationsQuery({
      params: { contactId: contactId, association_type: 'tickets' },
    });

  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  return {
    loadingTickets,
    dataGetTickets,

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

export default useTickets;
