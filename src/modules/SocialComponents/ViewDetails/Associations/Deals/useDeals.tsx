import { useState } from 'react';

import { useTheme } from '@mui/material';
import {
  useGetCompanyAssociationsQuery,
  usePostAssociationCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useGetDealsListQuery } from '@/services/airSales/deals';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useDeals = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [dealRecord, setDealRecord] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const paramObj = {
    search: searchName,
    recordId: companyId?.companyId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
  };
  const { data: getCompanyDeals, isLoading } = useGetCompanyAssociationsQuery({
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

  const [PostAssociationCompanies, { isLoading: isLoadingDelete }] =
    usePostAssociationCompaniesMutation();

  const handleDeleteDeals = async () => {
    const payload = {
      recordId: companyId?.companyId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
      dealIds: [dealRecord],
    };

    try {
      await PostAssociationCompanies({ body: payload }).unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
      setIsOpenAlert(false);
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
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
    isLoadingDelete,
  };
};

export default useDeals;
