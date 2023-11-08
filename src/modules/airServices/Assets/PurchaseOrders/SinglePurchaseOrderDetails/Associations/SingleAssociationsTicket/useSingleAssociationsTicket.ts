import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useSingleAssociationsTicket = () => {
  const [showDisassociate, setShowDisassociate] = useState(false);
  const [disassociateModal, setDisassociateModal] = useState(false);
  const handleSubmitDissociate = () => {
    enqueueSnackbar('Service request disassociate successfully', {
      variant: 'success',
    });
    setDisassociateModal(false);
  };
  const theme: any = useTheme();
  return {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
  };
};
