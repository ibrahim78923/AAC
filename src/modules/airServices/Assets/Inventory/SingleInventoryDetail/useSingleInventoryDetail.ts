import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleInventoryDetailActionDropdownFunction } from './SingleInventoryDetail.data';
import { useDeleteInventoryMutation } from '@/services/airServices/assets/inventory';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useGetInventoryOverviewQuery } from '@/services/airServices/assets/inventory/single-inventory-details/overview';

export const useSingleInventoryDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inventoryId = searchParams?.get('inventoryId');
  const { data, isLoading, isFetching } =
    useGetInventoryOverviewQuery(inventoryId);
  const inventoryData = data?.data?.[0];

  const [deleteInventoryTrigger] = useDeleteInventoryMutation();

  const submitDeleteHandler = async () => {
    const deleteTicketsParameter = {
      queryParams: 'ids=' + router?.query?.inventoryId,
    };

    try {
      const response: any = await deleteInventoryTrigger(
        deleteTicketsParameter,
      )?.unwrap();

      router?.push(AIR_SERVICES?.ASSETS_INVENTORY);

      enqueueSnackbar(response?.message ?? 'Inventory Deleted Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });

      setIsDeleteModalOpen?.(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });

      setIsDeleteModalOpen?.(false);
    }
  };

  // inventory action
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleInventoryDetailActionDropdown =
    singleInventoryDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  return {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    router,
    deleteInventoryTrigger,
    submitDeleteHandler,
    inventoryData,
    isFetching,
    isLoading,
  };
};
