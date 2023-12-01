import { useDeleteInventoryMutation } from '@/services/airServices/assets/inventory';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDeleteInventory = (props: any) => {
  const { setDeleteModalOpen, selectedInventoryLists } = props;
  const [deleteInventoryTrigger] = useDeleteInventoryMutation();

  const deleteInventory = async () => {
    const deleteParams = new URLSearchParams();

    selectedInventoryLists?.forEach(
      (inventoryId: any) => deleteParams?.append('ids', inventoryId),
    );

    const deleteInventoryParameter = {
      queryParams: deleteParams,
    };

    try {
      const response: any = await deleteInventoryTrigger(
        deleteInventoryParameter,
      )?.unwrap();

      enqueueSnackbar(
        response?.message ?? 'Selected Inventories Deleted Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );

      setDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });

      setDeleteModalOpen?.(false);
    }
  };

  return {
    deleteInventory,
  };
};
