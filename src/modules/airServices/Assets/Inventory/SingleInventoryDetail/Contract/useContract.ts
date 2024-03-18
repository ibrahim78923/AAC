import {
  useDeleteInventoryContractsMutation,
  useGetInventoryContractsQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/contract';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useContract = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme: any = useTheme();
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading, isFetching, isError } =
    useGetInventoryContractsQuery(router?.query?.inventoryId, {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.inventoryId,
    });
  const [deleteInventoryContracts, deleteIsLoading] =
    useDeleteInventoryContractsMutation();
  const handleDelete = async () => {
    try {
      const params = {
        id: router?.query?.inventoryId,
        contractId: deleteRecord,
      };
      const res: any = await deleteInventoryContracts(params)?.unwrap();
      successSnackbar(res?.message ?? 'Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err?.message ?? `Something went wrong`);
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
