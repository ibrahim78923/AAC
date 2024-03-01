import { useState } from 'react';

import { useTheme } from '@mui/material';
// import { PAGINATION } from '@/config';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';

const useTickets = (contactId: any) => {
  // Get Association Tickets
  // const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  // const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  // const [searchValue, setSearchValue] = useState(null);
  // const [filterParams, setFilterParams] = useState({
  //   page: page,
  //   limit: pageLimit,
  // });
  // let searchPayLoad;
  // if (searchValue) {
  //   searchPayLoad = { search: searchValue };
  // }
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
