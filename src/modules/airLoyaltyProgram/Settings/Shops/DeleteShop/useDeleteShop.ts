import { useDeleteShopMutation } from '@/services/airLoyaltyProgram/settings/shops';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteShop = (props: any) => {
  const {
    setIsPortalOpen,
    selectedShopsList,
    setSelectedShopsList,
    getShopLists,
    totalRecords,
    setPage,
    page,
  } = props;

  const [deleteShopTrigger, deleteShopStatus] = useDeleteShopMutation();

  const handleDeleteShop = async () => {
    const deleteParams = new URLSearchParams();
    selectedShopsList?.forEach(
      (singleShop: any) => deleteParams?.append('ids', singleShop?._id),
    );
    const apiDataParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteShopTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Selected Shops Deleted Successfully!');
      closeDeleteModal?.();
      const newPage = selectedShopsList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getShopLists?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setIsPortalOpen?.({});
    setSelectedShopsList?.([]);
  };

  return {
    handleDeleteShop,
    closeDeleteModal,
    deleteShopStatus,
  };
};
