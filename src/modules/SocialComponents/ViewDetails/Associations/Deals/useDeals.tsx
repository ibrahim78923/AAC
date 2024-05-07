import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetCompanyAssociationsQuery } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useDeleteAssociationMutation } from '@/services/commonFeatures/contacts/associations';
import { useGetDealsListQuery } from '@/services/airSales/deals';

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
  const filterValues = {
    page: PAGINATION?.CURRENT_PAGE,
    limit: PAGINATION?.PAGE_LIMIT,
  };
  const { data: getDealsTableList } = useGetDealsListQuery(filterValues);

  const newArray = filterArray(
    getDealsTableList?.data?.deals,
    getCompanyDeals?.data?.deals,
  );

  const existingDealsData = newArray?.map((lifecycle: any) => ({
    value: lifecycle?._id,
    label: lifecycle?.name,
  }));

  function filterArray(mainArray: any, subArray: any) {
    return mainArray?.filter((mainItem: any) => {
      return !subArray?.some((subItem: any) => subItem?._id === mainItem?._id);
    });
  }
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
    existingDealsData,
  };
};

export default useDeals;
