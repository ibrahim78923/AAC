import {
  useDeleteInventoryPurchaseOrderMutation,
  useGetInventoryPurchaseOrderQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/purchase-order';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const usePurchaseOrders = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme: any = useTheme();
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading, isFetching, isError } =
    useGetInventoryPurchaseOrderQuery(router?.query?.inventoryId, {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.inventoryId,
    });
  const [deleteInventoryPurchaseOrder, deleteIsLoading] =
    useDeleteInventoryPurchaseOrderMutation();
  const handleDelete = async () => {
    try {
      const params = {
        id: router?.query?.inventoryId,
        purchaseId: deleteRecord,
      };
      const res: any = await deleteInventoryPurchaseOrder(params)?.unwrap();
      successSnackbar(res?.message ?? 'Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err?.message);
    }
  };
  return {
    data,
    isLoading,
    isError,
    isFetching,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
    deleteRecord,
    deleteIsLoading,
  };
};
