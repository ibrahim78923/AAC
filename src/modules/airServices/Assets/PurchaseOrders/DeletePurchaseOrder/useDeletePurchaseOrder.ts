import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDeletePurchaseOrder = (props: any) => {
  const { setDeleteModalOpen, purchaseOrderData } = props;
  const deletePurchaseOrder = async () => {
    const deleteParams = new URLSearchParams();
    purchaseOrderData?.forEach(
      (purchaseOrderId: any) => deleteParams?.append('ids', purchaseOrderId),
    );
    try {
      enqueueSnackbar('Selected Purchase Orders Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar('Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setDeleteModalOpen?.(false);
    }
  };

  return {
    deletePurchaseOrder,
  };
};
