import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { PAGINATION } from '@/config';
import { useGetActivityLogQuery } from '@/services/airServices/assets/inventory/single-inventory-details/activity';
import { MODULE_TYPE } from '@/constants/strings';

export const useActivity = () => {
  const inventoryId = useSearchParams()?.get('inventoryId');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching } = useGetActivityLogQuery(
    {
      page,
      limit: pageLimit,
      moduleId: inventoryId,
      module: MODULE_TYPE?.INVENTORIES,
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
  };
};
