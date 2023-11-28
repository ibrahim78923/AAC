import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAgentRequest = () => {
  const [openRejectedModal, setOpenRejectedModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenRejectedModal(true);
  };
  const theme = useTheme();
  const handlerStatusApprove = () => {
    enqueueSnackbar(`Request Approved successfully`, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    theme,
    handlerStatusApprove,
    openRejectedModal,
    setOpenRejectedModal,
    handleOpenModal,
  };
};
