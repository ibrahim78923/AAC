import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeletePowerDialer = (props: any) => {
  const { id } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closePowerDialerDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };
  const deletePowerDialer = async () => {
    try {
      successSnackbar(id + ' deleted successfully');
      closePowerDialerDeleteModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      closePowerDialerDeleteModal?.();
    }
  };
  return {
    setOpenDeleteModal,
    openDeleteModal,
    closePowerDialerDeleteModal,
    deletePowerDialer,
  };
};
