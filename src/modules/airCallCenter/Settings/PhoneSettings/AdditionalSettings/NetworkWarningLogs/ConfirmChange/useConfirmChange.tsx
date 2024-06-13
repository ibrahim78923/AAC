import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useConfirmChange = (props: any) => {
  const { setChecked, openConfirmModal, setOpenConfirmModal } = props;
  const closeConfirmChangeModal = () => {
    setOpenConfirmModal?.(false);
  };
  const confirmChange = async () => {
    try {
      successSnackbar(' Confirmed successfully');
      closeConfirmChangeModal?.();
      setChecked?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data);
      closeConfirmChangeModal?.();
    }
  };
  return {
    setOpenConfirmModal,
    openConfirmModal,
    closeConfirmChangeModal,
    confirmChange,
  };
};
