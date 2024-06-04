import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeleteServiceLevel = (props: any) => {
  const { id } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeDeleteServiceLevelModal = () => {
    setOpenDeleteModal?.(false);
  };
  const deleteServiceLevel = async () => {
    try {
      successSnackbar(id + ' deleted successfully');
      closeDeleteServiceLevelModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.DeleteServiceLevel);
      closeDeleteServiceLevelModal?.();
    }
  };
  return {
    setOpenDeleteModal,
    openDeleteModal,
    closeDeleteServiceLevelModal,
    deleteServiceLevel,
  };
};
