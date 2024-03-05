import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  singlePurchaseDetailActionDropdownFunction,
  singlePurchaseDetailStatusDropdownFunction,
} from './SinglePurchaseDetail.data';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS, PURCHASE_ORDER_STATUS } from '@/constants/strings';
import {
  useDeletePurchaseOrderMutation,
  useLazyGetPurchaseOrderByIdQuery,
} from '@/services/airServices/assets/purchase-orders';
import { useSearchParams } from 'next/navigation';
import { usePatchPurchaseOrderStatusMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSinglePurchaseDetail = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);

  const [patchPurchaseOrderStatusTrigger] =
    usePatchPurchaseOrderStatusMutation();

  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams.get('purchaseOrderId');

  const [purchaseOrderTrigger, { data }]: any =
    useLazyGetPurchaseOrderByIdQuery();
  useEffect(() => {
    const handleStatus = async () => {
      await purchaseOrderTrigger(purchaseOrderId);
    };
    handleStatus();
  }, [purchaseOrderId]);

  const handleSubmitForOrdered = async () => {
    const upDateStatusData = { ...data };
    const updatedStatusData = { ...upDateStatusData };
    const newData = {
      ...updatedStatusData.data,
      status: PURCHASE_ORDER_STATUS?.ORDERED,
    };
    updatedStatusData.data = newData;

    const putContractSubmitApproval = {
      pathParam: { purchaseOrderId },
      body: updatedStatusData,
    };

    try {
      await patchPurchaseOrderStatusTrigger(
        putContractSubmitApproval,
      )?.unwrap();
      successSnackbar('purchase was sent for Approval');
    } catch (error) {
      errorSnackbar();
    }
  };

  const singlePurchaseDetailActionDropdown =
    singlePurchaseDetailActionDropdownFunction(setIsDeleteModalOpen, router);
  const singlePurchaseDetailStatusDropdown =
    singlePurchaseDetailStatusDropdownFunction(handleSubmitForOrdered);

  const [deletePurchaseOrderTrigger, { isLoading }] =
    useDeletePurchaseOrderMutation();
  const deletePurchaseOrder = async () => {
    try {
      await deletePurchaseOrderTrigger(purchaseOrderId)?.unwrap();
      enqueueSnackbar('Purchase Order deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDeleteModalOpen(false);
      router?.push(AIR_SERVICES?.PURCHASE_ORDER);
    } catch (error: any) {
      enqueueSnackbar(
        error?.data?.message?.error ?? 'Purchase Order not deleted',
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
    }
  };
  return {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    singlePurchaseDetailStatusDropdown,
    deletePurchaseOrder,
    isLoading,
    handleSubmitForOrdered,
  };
};
