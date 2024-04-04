import {
  useDeleteInventorySoftwareMutation,
  useGetInventorySoftwareQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/software';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSoftware = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading, isFetching, isError } = useGetInventorySoftwareQuery(
    router?.query?.inventoryId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.inventoryId,
    },
  );
  const [deleteInventorySoftware, deleteIsLoading] =
    useDeleteInventorySoftwareMutation();
  const handleDelete = async () => {
    try {
      const res: any = await deleteInventorySoftware({
        body: {
          softwareId: router?.query?.inventoryId,
          id: deleteRecord,
        },
      })?.unwrap();
      successSnackbar(res?.message ?? 'Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err?.data?.message);
      setOpenDeleteModal(false);
    }
  };
  return {
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    setDelateRecord,
    data,
    isFetching,
    isError,
    deleteIsLoading,
  };
};
