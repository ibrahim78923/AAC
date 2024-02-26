import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetTicketsQuery } from '@/services/airServices/tickets';

const useTickets = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const apiDataParameter = { queryParams: { search: searchName } };
  const { data, isLoading } = useGetTicketsQuery(apiDataParameter);
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
    isLoading,
  };
};

export default useTickets;
