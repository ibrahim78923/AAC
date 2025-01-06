import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteAirServicesAssetsInventoryExpenseMutation } from '@/services/airServices/assets/inventory/single-inventory-details/expense';

export const useDeleteExpense = (props: any) => {
  const {
    setIsPortalOpen,
    selectedExpenseList = [],
    setSelectedExpenseList,
  } = props;

  const [
    deleteAirServicesAssetsInventoryExpenseTrigger,
    deleteAirServicesAssetsInventoryExpenseStatus,
  ] = useDeleteAirServicesAssetsInventoryExpenseMutation();

  const closeModal = () => {
    setIsPortalOpen?.({});
    setSelectedExpenseList?.([]);
  };

  const handleDelete = async () => {
    const apiDataParameter = {
      ids: selectedExpenseList?.map((expense: any) => expense?._id),
    };

    try {
      await deleteAirServicesAssetsInventoryExpenseTrigger(apiDataParameter);
      successSnackbar('Record deleted successfully');
      closeModal();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress =
    deleteAirServicesAssetsInventoryExpenseStatus?.isLoading;

  return {
    apiCallInProgress,
    handleDelete,
    closeModal,
  };
};
