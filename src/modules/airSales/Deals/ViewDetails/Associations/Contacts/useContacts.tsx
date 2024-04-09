import { useState } from 'react';

import { useTheme } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useContacts = (dealId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [contactRecord, setContactRecord] = useState<any>({});
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
          contactId: contactRecord?._id,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
