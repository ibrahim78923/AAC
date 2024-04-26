import { PAGINATION } from '@/config';
import { useGetAgentAssetDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { inventoryListsColumnsDynamic } from './Assets.data';

export const useAssets = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { agentId } = router?.query;
  const getAgentAssetDetailsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      usedBy: agentId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAgentAssetDetailsQuery(getAgentAssetDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const inventoryListsColumns = inventoryListsColumnsDynamic(router);
  return {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    inventoryListsColumns,
  };
};
