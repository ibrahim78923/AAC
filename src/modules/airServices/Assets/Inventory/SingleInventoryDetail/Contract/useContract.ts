import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetInventoryContractsQuery } from '@/services/airServices/assets/inventory/single-inventory-details/contract';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useContract = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme: any = useTheme();
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading } = useGetInventoryContractsQuery(
    router?.query?.inventoryId,
  );
  const AssetsInventoryContractsData = data?.data;

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
    AssetsInventoryContractsData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
    deleteRecord,
  };
};
