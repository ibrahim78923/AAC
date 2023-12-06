import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useAgentConversionDelete = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const submitDeleteModal = () => {
    enqueueSnackbar('Delete Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setDeleteModal(false);
  };

  return {
    deleteModal,
    setDeleteModal,
    submitDeleteModal,
  };
};
