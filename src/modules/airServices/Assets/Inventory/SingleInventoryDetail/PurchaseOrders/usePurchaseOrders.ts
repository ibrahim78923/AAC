import { useGetInventoryPurchaseOrderQuery } from '@/services/airServices/assets/inventory/single-inventory-details/purchase-order';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const usePurchaseOrders = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme: any = useTheme();
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading } = useGetInventoryPurchaseOrderQuery(
    router?.query?.inventoryId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.inventoryId,
    },
  );
  const AssetsInventoryPurchaseOrderData = data?.data;

  const handleDelete = async () => {
    try {
      successSnackbar('Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar();
    }
  };
  return {
    AssetsInventoryPurchaseOrderData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
    deleteRecord,
  };
};
