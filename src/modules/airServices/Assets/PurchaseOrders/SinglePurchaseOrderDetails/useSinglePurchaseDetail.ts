import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  singlePurchaseDetailActionDropdownFunction,
  singlePurchaseDetailStatusDropdownFunction,
} from './SinglePurchaseDetail.data';
import { usePutPurchaseOrderStatusMutation } from '@/services/airServices/assets/purchase-orders';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSinglePurchaseDetail = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState<boolean>(false);

  const [putPurchaseOrderStatusTrigger] = usePutPurchaseOrderStatusMutation();

  const { purchaseOrderId }: any = router?.query;

  const handleSubmitForOrdered = async (status: string) => {
    const orderedStatusParams = {
      id: purchaseOrderId,
      status: status,
    };

    try {
      await putPurchaseOrderStatusTrigger(orderedStatusParams)?.unwrap();
      successSnackbar('Order successfully placed');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const singlePurchaseDetailStatusDropdown: any =
    singlePurchaseDetailStatusDropdownFunction(handleSubmitForOrdered);

  const singlePurchaseDetailActionDropdown =
    singlePurchaseDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  return {
    singlePurchaseDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    singlePurchaseDetailStatusDropdown,
    handleSubmitForOrdered,
    purchaseOrderId,
  };
};
