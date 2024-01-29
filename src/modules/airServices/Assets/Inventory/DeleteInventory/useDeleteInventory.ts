import { useDeleteInventoryMutation } from '@/services/airServices/assets/inventory';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';

export const useDeleteInventory = (props: any) => {
  const {
    setDeleteModalOpen,
    selectedInventoryLists,
    setSelectedInventoryLists,
    setPage,
  } = props;
  const [deleteInventoryTrigger, deleteInventoryStatus] =
    useDeleteInventoryMutation();
  const router = useRouter();
  const { makePath } = usePath();
  const deleteInventory = async () => {
    const deleteParams = new URLSearchParams();

    selectedInventoryLists?.forEach((inventoryId: any) =>
      deleteParams?.append('ids', inventoryId),
    );

    const deleteInventoryParameter = {
      queryParams: deleteParams,
    };

    try {
      const response: any = await deleteInventoryTrigger(
        deleteInventoryParameter,
      )?.unwrap();

      enqueueSnackbar('Record delete successfully' ?? response?.message, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedInventoryLists([]);
      setPage(1);
      closeTicketsDeleteModal?.();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
