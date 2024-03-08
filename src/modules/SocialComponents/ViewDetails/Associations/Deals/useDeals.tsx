import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetCompanyDealsQuery } from '@/services/commonFeatures/companies';
import { useDeleteDealsMutation } from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';

const useDeals = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [dealRecord, setDealRecord] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [deleteDealsMutation] = useDeleteDealsMutation();

  // const searchObj = {
  //    search: searchName,
  //   id: companyId.companyId,
  // };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const { data: getCompanyDeals, isLoading } = useGetCompanyDealsQuery({
    page,
    pageLimit,
    // params: searchObj,
    id: companyId.companyId,
  });

  const handleDeleteDeals = async () => {
    try {
      await deleteDealsMutation({ ids: dealRecord });
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      setDealRecord('');
      handleCloseAlert();
    } catch (error) {
      enqueueSnackbar('Error while deleting deals', {
        variant: 'error',
      });
    }
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
    getCompanyDeals,
    handleDeleteDeals,
    setDealRecord,
    dealRecord,
    isLoading,
    setPage,
    setPageLimit,
  };
};

export default useDeals;
