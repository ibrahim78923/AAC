import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const useInstallationHeader = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleMenuExport = () => {
    enqueueSnackbar('File export successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const submitDeleteModel = async () => {
    enqueueSnackbar('Device Removed Successfully', {
      variant: 'success',
    });
    setDeleteModal(false);
  };
  return {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    handleMenuExport,
  };
};
