import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetTicketsQuery } from '@/services/airServices/tickets';
import { PAGINATION } from '@/config';

const useTickets = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const apiDataParameter = {
    queryParams: { search: searchName, page, limit: pageLimit },
  };
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
    setPage,
    setPageLimit,
  };
};

export default useTickets;
