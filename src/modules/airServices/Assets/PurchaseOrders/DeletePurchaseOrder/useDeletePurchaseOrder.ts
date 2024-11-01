import { AIR_SERVICES } from '@/constants/routes';
import { useDeleteAirServicesAssetsPurchaseOrderPurchaseOrderMutation } from '@/services/airServices/assets/purchase-orders';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
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
    useDeleteAirServicesAssetsPurchaseOrderPurchaseOrderMutation();

  const deletePurchaseOrder = async () => {
    const purchaseOrderIds = purchaseOrderData?.map((item: any) => item?._id);
    const patchPurchaseOrderParameter = {
      pathParams: { ids: purchaseOrderIds },
    };
    try {
      await deletePurchaseOrderTrigger(patchPurchaseOrderParameter)?.unwrap();
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
