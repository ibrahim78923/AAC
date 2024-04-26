import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useAttachments = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [attachmentRecord, setAttachmentRecord] = useState<any>({});

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: loadingDelete }] =
    useDeleteAssociationMutation();

  const deleteAttachmentHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          attachmentId: attachmentRecord?._id,
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
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    deleteAttachmentHandler,
    attachmentRecord,
    setAttachmentRecord,
    loadingDelete,
  };
};

export default useAttachments;
