import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';

export const useAssociatesLists = () => {
  const theme = useTheme();
  const [deleteModal, setDeleteModal] = useState(false);
  const submitDeleteModel = async () => {
    enqueueSnackbar('Task Delete Successfully', {
      variant: 'error',
    });
    setDeleteModal(false);
  };
  return {
    theme,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
  };
};
