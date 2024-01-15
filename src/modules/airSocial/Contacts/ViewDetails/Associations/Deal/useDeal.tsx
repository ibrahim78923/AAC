import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';

const useDeal = (contactId: any) => {
  // Get Association Tickets
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams] = useState({
    page: page,
    limit: pageLimit,
    contactId: contactId,
    association_type: 'deals',
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetDeals, isLoading: loadingDeals } =
    useGetContactAssociationsQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Drawer Edit
  const [drawerTitle, setDrawerTitle] = useState('View');
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = (title: string) => {
    setDrawerTitle(title);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const theme = useTheme();
  const [searchName, setSearchName] = useState('');

  const [selectStage, setSelectStage] = useState('');
  const [selectPipline, setSelectPipline] = useState('');

  return {
    setPage,
    setPageLimit,
    searchValue,
    setSearchValue,
    loadingDeals,
    dataGetDeals,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,

    theme,
    setIsOpenAlert,
    searchName,
    setSearchName,
    setOpenDrawer,
    selectPipline,
    setSelectPipline,
    setSelectStage,
    selectStage,
  };
};

export default useDeal;
