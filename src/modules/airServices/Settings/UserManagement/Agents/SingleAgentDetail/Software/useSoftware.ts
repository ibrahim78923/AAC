import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGetAgentSoftwareDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { softwareColumnsDynamic } from './Software.data';

export const useSoftware = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { agentId } = router?.query;
  const getAgentSoftwareDetailsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      requester: agentId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAgentSoftwareDetailsQuery(getAgentSoftwareDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const softwareColumns = softwareColumnsDynamic(router);
  return {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    softwareColumns,
  };
};
