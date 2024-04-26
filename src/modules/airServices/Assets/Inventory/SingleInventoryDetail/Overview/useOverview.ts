import { useGetSingleInventoryOverviewQuery } from '@/services/airServices/assets/inventory/single-inventory-details/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useOverview = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const inventoryId = searchParams?.get('inventoryId');

  const { data, isLoading, isFetching, isError } =
    useGetSingleInventoryOverviewQuery(inventoryId, {
      refetchOnMountOrArgChange: true,
      skip: !!!inventoryId,
    });
  const inventoryData = data?.data?.[0];

  return {
    theme,
    inventoryData,
    isLoading,
    isFetching,
    isError,
  };
};
