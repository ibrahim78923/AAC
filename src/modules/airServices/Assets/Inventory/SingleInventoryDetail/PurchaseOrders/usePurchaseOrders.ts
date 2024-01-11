import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetInventoryPurchaseOrderQuery } from '@/services/airServices/assets/inventory/single-inventory-details/purchase-order';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const usePurchaseOrders = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme: any = useTheme();
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading } = useGetInventoryPurchaseOrderQuery(
    router?.query?.inventoryId,
  );
  const AssetsInventoryPurchaseOrderData = data?.data;

  const handleDelete = async () => {
    try {
      enqueueSnackbar('Record deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenDeleteModal(false);
    } catch (err: any) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
