import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDeleteShop = (props: any) => {
  const { setDeleteModalOpen, purchaseOrderData } = props;
  const handleDeleteShop = async () => {
    const deleteParams = new URLSearchParams();
    purchaseOrderData?.forEach(
      (purchaseOrderId: any) => deleteParams?.append('ids', purchaseOrderId),
    );
    try {
      enqueueSnackbar('Selected Shops Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setDeleteModalOpen?.(false);
    }
  };

  return {
    handleDeleteShop,
  };
};
