import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

const useActionDropDown = (
  setCheckedRows: any,
  checkedRows: any,
  deleteReceiverBankAccount: any,
  setIsDeleteModal: any,
) => {
  const handleBulkDelete = async () => {
    await deleteReceiverBankAccount({ body: { ids: checkedRows } })?.unwrap();
    setCheckedRows([]);
    enqueueSnackbar(`Accounts deleted successfully`, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const handleConfirmDelete = async () => {
    await deleteReceiverBankAccount({ body: { ids: checkedRows } })?.unwrap();
    setIsDeleteModal(false);
    setCheckedRows([]);
    enqueueSnackbar(`Account deleted successfully`, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    handleBulkDelete,
    handleConfirmDelete,
  };
};

export default useActionDropDown;
