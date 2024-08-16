import { useRouter } from 'next/router';
import { useState } from 'react';
import { singleInventoryDetailActionDropdownFunction } from './SingleInventoryDetail.data';
import { useSearchParams } from 'next/navigation';
import { useGetInventoryOverviewQuery } from '@/services/airServices/assets/inventory/single-inventory-details/overview';
import { ARRAY_INDEX } from '@/constants/strings';

export const useSingleInventoryDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inventoryId = searchParams?.get('inventoryId');
  const { data, isLoading, isFetching } = useGetInventoryOverviewQuery(
    inventoryId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!inventoryId,
    },
  );
  const inventoryData = data?.data?.[ARRAY_INDEX?.ZERO];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const singleInventoryDetailActionDropdown =
    singleInventoryDetailActionDropdownFunction(setIsDeleteModalOpen, router);

  return {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    inventoryData,
    isFetching,
    isLoading,
    inventoryId,
  };
};
