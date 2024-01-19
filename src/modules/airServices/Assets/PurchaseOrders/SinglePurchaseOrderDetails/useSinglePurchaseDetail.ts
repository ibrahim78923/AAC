import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  singlePurchaseDetailActionDropdownFunction,
  singlePurchaseDetailStatusDropdownFunction,
} from './SinglePurchaseDetail.data';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeletePurchaseOrderMutation } from '@/services/airServices/assets/purchase-orders';
import { useSearchParams } from 'next/navigation';

export const useSinglePurchaseDetail = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);

  const singlePurchaseDetailActionDropdown =
    singlePurchaseDetailActionDropdownFunction(setIsDeleteModalOpen, router);
  const singlePurchaseDetailStatusDropdown =
    singlePurchaseDetailStatusDropdownFunction();
  const searchParams = useSearchParams();
  const purchaseOrderId: any = searchParams.get('purchaseOrderId');
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
  };
};
