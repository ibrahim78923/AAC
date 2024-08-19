import { useGetSingleInventoryOverviewQuery } from '@/services/airServices/assets/inventory/single-inventory-details/overview';
import { useSearchParams } from 'next/navigation';
import { overviewDataArray } from './Overview.data';
import { ARRAY_INDEX } from '@/constants/strings';

export const useOverview = () => {
  const searchParams = useSearchParams();
  const inventoryId = searchParams?.get('inventoryId');

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleInventoryOverviewQuery(inventoryId, {
      refetchOnMountOrArgChange: true,
      skip: !!!inventoryId,
    });
  const inventoryData = data?.data?.[ARRAY_INDEX?.ZERO] ?? {};

  const overviewData = overviewDataArray(inventoryData);

  return {
    isLoading,
    isFetching,
    isError,
    overviewData,
    refetch,
  };
};
