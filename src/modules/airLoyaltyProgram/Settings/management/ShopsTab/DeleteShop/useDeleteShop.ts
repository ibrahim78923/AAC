import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteShop = (props: any) => {
  const { setDeleteModalOpen, purchaseOrderData } = props;
  const handleDeleteShop = async () => {
    const deleteParams = new URLSearchParams();
    purchaseOrderData?.forEach(
      (purchaseOrderId: any) => deleteParams?.append('ids', purchaseOrderId),
    );
    try {
      successSnackbar('Selected Shops Deleted Successfully!');
      setDeleteModalOpen?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModalOpen?.(false);
    }
  };

  return {
    handleDeleteShop,
  };
};
