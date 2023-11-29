import { useState } from 'react';

import { useTheme } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useContacts = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [contactRecord, setContactRecord] = useState({});

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation] = useDeleteAssociationMutation();

  const deleteContactHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          //todo:temporary id
          dealId: '655b2b2ecd318b576d7d71e8',
          contactId: contactRecord?._id,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
      setOpenDrawer('');
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
    deleteContactHandler,
    contactRecord,
    setContactRecord,
  };
};

export default useContacts;
