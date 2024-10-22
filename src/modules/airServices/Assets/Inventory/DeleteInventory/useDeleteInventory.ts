import { useDeleteAirServicesAssetsInventoryMutation } from '@/services/airServices/assets/inventory';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import { DeleteInventoryI } from './DeleteInventory.interface';

export const useDeleteInventory = (props: DeleteInventoryI) => {
  const {
    setDeleteModalOpen,
    selectedInventoryLists,
    setSelectedInventoryLists,
    setPage,
    totalRecords,
    page,
    getInventoryListData,
    isMoveBack = false,
  } = props;

  const [deleteInventoryTrigger, deleteInventoryStatus] =
    useDeleteAirServicesAssetsInventoryMutation();

  const router = useRouter();

  const { makePath } = usePath();

  const deleteInventory = async () => {
    const deleteParams = new URLSearchParams();

    selectedInventoryLists?.forEach(
      (inventoryId: string) => deleteParams?.append('ids', inventoryId),
    );
    const deleteInventoryParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteInventoryTrigger(deleteInventoryParameter)?.unwrap();
      successSnackbar('Record(s) Deleted Successfully');
      setSelectedInventoryLists?.([]);
      closeInventoryDeleteModal?.();
      const newPage: number | any =
        selectedInventoryLists?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getInventoryListData?.(newPage);

      router?.push(
        makePath({
          path: AIR_SERVICES?.ASSETS_INVENTORY,
          skipQueries: ['inventoryListsAction'],
        }),
      );
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      closeInventoryDeleteModal?.();
    }
  };
  const closeInventoryDeleteModal = () => {
    !isMoveBack &&
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['inventoryListsAction'],
        }),
      );
    setSelectedInventoryLists?.([]);
    setDeleteModalOpen?.(false);
  };
  return {
    deleteInventory,
    deleteInventoryStatus,
    closeInventoryDeleteModal,
  };
};
