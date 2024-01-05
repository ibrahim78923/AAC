import { useState } from 'react';

import { useTheme } from '@mui/material';
import { getSession } from '@/utils';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '@/services/commonFeatures/contacts';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';

const useContacts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [contactRecord, setContactRecord] = useState({});
  const { user } = getSession();

  const searchObj = {
    search: searchName,
    contactOwnerId: user?._id,
  };
  const { data, isLoading } = useGetContactsQuery({
    page,
    pageLimit,
    params: searchObj,
  });

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteContact] = useDeleteContactMutation();

  const deleteContactHandler = async () => {
    try {
      await deleteContact({ id: contactRecord?._id })?.unwrap();
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
  };
};

export default useContacts;
