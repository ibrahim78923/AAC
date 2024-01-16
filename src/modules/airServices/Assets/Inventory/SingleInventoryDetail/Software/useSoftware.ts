import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteInventorySoftwareMutation,
  useGetInventorySoftwareQuery,
} from '@/services/airServices/assets/inventory/single-inventory-details/software';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const useSoftware = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRecord, setDelateRecord] = useState();
  const router = useRouter();
  const { data, isLoading } = useGetInventorySoftwareQuery(
    router?.query?.inventoryId,
  );
  const AssetsInventorySoftwareData = data?.data?.inventories;
  const [deleteInventorySoftware] = useDeleteInventorySoftwareMutation();

  const handleDelete = async () => {
    try {
      const res: any = await deleteInventorySoftware(deleteRecord);
      enqueueSnackbar(res?.message ?? 'Record deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setOpenDeleteModal(false);
    } catch (err: any) {
      enqueueSnackbar(err?.message ?? `Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    AssetsInventorySoftwareData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    setDelateRecord,
  };
};
