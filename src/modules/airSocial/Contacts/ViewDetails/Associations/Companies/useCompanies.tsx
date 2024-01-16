import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';

const useCompanies = (contactId: any) => {
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
    association_type: 'companies',
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetCompanies, isLoading: loadingCompanies } =
    useGetContactAssociationsQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Drawer Edit
  const methodsView = useForm({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = (data: any) => {
    if (data) {
      methodsView.setValue('name', data?.name);
      methodsView.setValue('dealPiplineId', data?.dealPiplineId);
      methodsView.setValue('dealStageId', data?.dealStageId);
      methodsView.setValue('amount', data?.amount);
      methodsView.setValue('closeDate', new Date(data?.closeDate));
      methodsView.setValue('ownerId', data?.ownerId);
      methodsView.setValue('priority', data?.priority);
      methodsView.setValue('addLineItemId', data?.addLineItemId);
    }
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

  return {
    setPage,
    setPageLimit,
    searchValue,
    setSearchValue,
    loadingCompanies,
    dataGetCompanies,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsView,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,

    theme,
  };
};

export default useCompanies;
