import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  useGetCompanyAssociationsQuery,
  usePostAssociationCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';

const useTickets = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [contactRecord, setContactRecord] = useState({});

  const paramObj = {
    search: searchName,
    recordId: companyId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
  };
  const { data, isLoading } = useGetCompanyAssociationsQuery({
    page,
    pageLimit,
    params: paramObj,
  });
  const [PostAssociationCompanies, { isLoading: isLoadingDelete }] =
    usePostAssociationCompaniesMutation();

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const deleteContactHandler = async () => {
    const payload = {
      recordId: companyId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
      ticketsIds: [contactRecord?._id],
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
    data,
    isLoading,
    setPage,
    setPageLimit,
    deleteContactHandler,
    isLoadingDelete,
    setContactRecord,
    contactRecord,
  };
};

export default useTickets;
