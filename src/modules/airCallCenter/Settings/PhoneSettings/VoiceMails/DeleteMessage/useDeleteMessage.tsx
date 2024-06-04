import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeleteMessage = (props: any) => {
  const { id } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeMessageDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };
  const deleteMessage = async () => {
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
    deleteMessage,
  };
};
