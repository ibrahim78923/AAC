import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useAgentConversionWarning = () => {
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const submitWarningModal = () => {
    enqueueSnackbar('Warning', {
      variant: NOTISTACK_VARIANTS?.WARNING,
    });
    setWarningModal(false);
  };

  return {
    warningModal,
    setWarningModal,
    submitWarningModal,
  };
};
