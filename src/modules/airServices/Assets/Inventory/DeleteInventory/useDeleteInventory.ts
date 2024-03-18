import { useDeleteInventoryMutation } from '@/services/airServices/assets/inventory';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteInventory = (props: any) => {
  const {
    setDeleteModalOpen,
    selectedInventoryLists,
    setSelectedInventoryLists,
    setPage,
    totalRecords,
    page,
    getInventoryListData,
  } = props;
  const [deleteInventoryTrigger, deleteInventoryStatus] =
    useDeleteInventoryMutation();
  const router = useRouter();
  const { makePath } = usePath();
  const deleteInventory = async () => {
    const deleteParams = new URLSearchParams();

    selectedInventoryLists?.forEach(
      (inventoryId: any) => deleteParams?.append('ids', inventoryId),
    );

    const deleteInventoryParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteInventoryTrigger(deleteInventoryParameter)?.unwrap();
      successSnackbar('Record delete successfully');
      setSelectedInventoryLists([]);
      const newPage =
        selectedInventoryLists?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getInventoryListData?.(newPage);
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      closeTicketsDeleteModal?.();
    }
  };
  const closeTicketsDeleteModal = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['inventoryListsAction'],
      }),
    );
    setDeleteModalOpen?.(false);
  };
  return {
    deleteInventory,
    deleteInventoryStatus,
  };
};
