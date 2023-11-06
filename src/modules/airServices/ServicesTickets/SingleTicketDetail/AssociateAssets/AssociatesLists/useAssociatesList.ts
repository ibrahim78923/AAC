import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';

export const useAssociatesLists = () => {
  const theme = useTheme();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const submitDeleteModel = async () => {
    enqueueSnackbar('Task Delete Successfully', {
      variant: 'error',
      autoHideDuration: 2000,
    });
    setDeleteModal(false);
  };
  return {
    theme,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    openDrawer,
    setOpenDrawer,
  };
};
