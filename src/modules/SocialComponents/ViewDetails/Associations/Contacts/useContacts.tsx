import { useState } from 'react';

import { useTheme } from '@mui/material';
import {
  useGetContactsQuery,
  useUpdateContactMutation,
} from '@/services/commonFeatures/contacts';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import { useGetCompanyAssociationsQuery } from '@/services/commonFeatures/companies';
import { isNullOrEmpty } from '@/utils';

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
    association_type: 'contacts',
  };
  const { data, isLoading } = useGetCompanyAssociationsQuery({
    id: companyId,
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

  const [updateContacts] = useUpdateContactMutation();

  const deleteContactHandler = async () => {
    const formData = new FormData();

    formData.append('recordType', 'contacts');
    formData.append('recordId', '');
    try {
      await updateContacts({ body: formData, id: contactRecord?._id }).unwrap();
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
    setPageLimit,
    setPage,
    contactRecord,
    setContactRecord,
    deleteContactHandler,
    existingContactData,
    newArray,
  };
};

export default useContacts;
