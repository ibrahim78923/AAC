import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import {
  useGetCompanyAssociationsQuery,
  usePostAssociationCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { isNullOrEmpty } from '@/utils';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useContacts = (companyId: any) => {
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
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
  };
  const { data, isLoading } = useGetCompanyAssociationsQuery({
    page,
    pageLimit,
    params: paramObj,
  });

  const { data: GetAllContacts } = useGetContactsQuery({});

  const newArray = filterArray(
    GetAllContacts?.data?.contacts,
    data?.data?.contacts,
  );

  const existingContactData = newArray?.map((lifecycle: any) => ({
    value: lifecycle?._id,
    label: isNullOrEmpty(lifecycle?.firstName)
      ? lifecycle?.email
      : `${lifecycle?.firstName} ${lifecycle?.lastName}`,
  }));

  function filterArray(mainArray: any, subArray: any) {
    return mainArray?.filter((mainItem: any) => {
      return !subArray?.some((subItem: any) => subItem?._id === mainItem?._id);
    });
  }

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [PostAssociationCompanies, { isLoading: isLoadingRemoveContact }] =
    usePostAssociationCompaniesMutation();
  const deleteContactHandler = async () => {
    const payload = {
      recordId: companyId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
      contactsIds: [contactRecord?._id],
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
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    data,
    isLoading,
    setPageLimit,
    setPage,
    contactRecord,
    setContactRecord,
    deleteContactHandler,
    existingContactData,
    newArray,
    isLoadingRemoveContact,
  };
};

export default useContacts;
