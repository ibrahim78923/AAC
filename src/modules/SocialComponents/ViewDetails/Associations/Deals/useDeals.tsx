import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetCompanyAssociationsQuery } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useDeleteAssociationMutation } from '@/services/commonFeatures/contacts/associations';

const useDeals = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [dealRecord, setDealRecord] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  // const searchObj = {
  //    search: searchName,
  //   id: companyId.companyId,
  // };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const paramObj = {
    search: searchName,
    association_type: 'deals',
  };
  const { data: getCompanyDeals, isLoading } = useGetCompanyAssociationsQuery({
    id: companyId?.companyId,
    page,
    pageLimit,
    params: paramObj,
  });
  const [DeleteAssociationDeals] = useDeleteAssociationMutation();

  const handleDeleteDeals = async () => {
    try {
      await DeleteAssociationDeals({
        body: {
          dealId: dealRecord,
          companyId: companyId?.companyId,
        },
      }).unwrap();
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      setDealRecord('');
      handleCloseAlert();
    } catch (error) {
      enqueueSnackbar(error?.data?.message ?? 'Error occurred', {
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
