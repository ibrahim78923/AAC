import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetCompanyDealsQuery } from '@/services/commonFeatures/companies';
import { useDeleteDealsMutation } from '@/services/airSales/deals';
import { enqueueSnackbar } from 'notistack';

const useDeals = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [dealRecord, setDealRecord] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [deleteDealsMutation] = useDeleteDealsMutation();

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const { data: getCompanyDeals } = useGetCompanyDealsQuery({
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
  };
};

export default useDeals;
