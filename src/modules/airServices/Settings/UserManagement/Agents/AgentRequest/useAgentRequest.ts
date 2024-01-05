import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetAgentRequesterQuery } from '@/services/airServices/settings/user-management/agents';

export const useAgentRequest = () => {
  const [openRejectedModal, setOpenRejectedModal] = useState<boolean>(false);
  const params = {};
  const { data } = useGetAgentRequesterQuery(params);
  const requesterData = data?.data;

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
    requesterData,
  };
};
