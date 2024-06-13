import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeleteCallTag = (props: any) => {
  const { id } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeMessageDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };
  const deleteCallTag = async () => {
    try {
      successSnackbar(id + ' deleted successfully');
      closeMessageDeleteModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      closeMessageDeleteModal?.();
    }
  };
  return {
    setOpenDeleteModal,
    openDeleteModal,
    closeMessageDeleteModal,
    deleteCallTag,
  };
};
