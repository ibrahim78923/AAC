import { AIR_SERVICES } from '@/constants';
import { useDeletePurchaseOrderMutation } from '@/services/airServices/assets/purchase-orders';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useDeletePurchaseOrder = (props: any) => {
  const {
    setDeleteModalOpen,
    purchaseOrderData,
    setPage,
    totalRecords,
    page,
    getPurchaseOrderListData,
    setPurchaseOrderData,
    canMoveBack = false,
  } = props;

  const router = useRouter();

  const [deletePurchaseOrderTrigger, deletePurchaseOrderStatus] =
    useDeletePurchaseOrderMutation();
  const deletePurchaseOrder = async () => {
    try {
      await deletePurchaseOrderTrigger(purchaseOrderData?.[0]?._id)?.unwrap();
      successSnackbar('Purchase Order Deleted Successfully!');
      closePurchaseOrderDeleteModal?.();
      canMoveBack && router?.push(AIR_SERVICES?.PURCHASE_ORDER);
      const newPage = purchaseOrderData?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getPurchaseOrderListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePurchaseOrderDeleteModal = () => {
    setPurchaseOrderData?.([]);
    setDeleteModalOpen?.(false);
  };
  return {
    deletePurchaseOrder,
    deletePurchaseOrderStatus,
    closePurchaseOrderDeleteModal,
  };
};
