import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { assignedTicketsColumnsDynamic } from './AssignedTickets.data';
import { useGetAgentTicketDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';

export const useAssignedTickets = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { agentId } = router?.query;
  const getAgentTicketDetailsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      agent: agentId,
      metaData: true,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAgentTicketDetailsQuery(getAgentTicketDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const assignedTicketsColumns = assignedTicketsColumnsDynamic(router);
  return {
    setPage,
    setPageLimit,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    assignedTicketsColumns,
  };
};
