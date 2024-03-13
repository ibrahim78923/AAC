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
  const { data, isLoading } = useGetInventorySoftwareQuery(
    router?.query?.inventoryId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.inventoryId,
    },
  );
  const AssetsInventorySoftwareData = data?.data?.inventories;
  const [deleteInventorySoftware] = useDeleteInventorySoftwareMutation();

  const handleDelete = async () => {
    try {
      const res: any = await deleteInventorySoftware(deleteRecord);
      successSnackbar(res?.message ?? 'Record deleted Successfully');
      setOpenDeleteModal(false);
    } catch (err: any) {
      errorSnackbar(err?.message ?? `Something went wrong`);
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
