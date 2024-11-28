import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PAGINATION } from '@/config';
import { useGetAirServicesAssetsInventoryActivityLogQuery } from '@/services/airServices/assets/inventory/single-inventory-details/activity';
import { ACTIVITY_LOGS_MODULE } from '@/constants/activity-logs';

export const useActivity = () => {
  const inventoryId = useSearchParams()?.get('inventoryId');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching, refetch } =
    useGetAirServicesAssetsInventoryActivityLogQuery(
      {
        page,
        limit: pageLimit,
        moduleId: inventoryId,
        module: ACTIVITY_LOGS_MODULE?.INVENTORIES,
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  return {
    isLoading,
    isError,
    setPageLimit,
    setPage,
    isFetching,
    data,
    refetch,
  };
};
