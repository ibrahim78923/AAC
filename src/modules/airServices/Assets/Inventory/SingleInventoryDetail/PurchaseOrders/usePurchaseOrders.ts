import {
  useDeleteInventoryPurchaseOrderMutation,
  useGetInventoryPurchaseOrderQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/purchase-order';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const usePurchaseOrders = () => {
  const theme = useTheme();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRecord, setDelateRecord] = useState();

  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } =
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
      await deleteInventoryPurchaseOrder(params)?.unwrap();
      successSnackbar('Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err?.data?.message);
      setOpenDeleteModal(false);
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
    refetch,
  };
};
