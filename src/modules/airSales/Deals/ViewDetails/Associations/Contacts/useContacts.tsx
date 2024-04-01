import { useState } from 'react';

import { useTheme } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useContacts = (dealId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [contactRecord, setContactRecord] = useState({});
  const [searchName, setSearchName] = useState('');

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: contactLoading }] =
    useDeleteAssociationMutation();

  const deleteContactHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          contactId: contactRecord,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
      setOpenDrawer('');
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    deleteContactHandler,
    contactRecord,
    setContactRecord,
    contactLoading,
    searchName,
    setSearchName,
  };
};

export default useContacts;
