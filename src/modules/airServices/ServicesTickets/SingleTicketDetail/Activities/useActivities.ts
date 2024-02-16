import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetActivityLogQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { PAGINATION } from '@/config';

export const useActivities = () => {
  const ticketId = useSearchParams()?.get('ticketId');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching } = useGetActivityLogQuery(
    {
      page,
      limit: pageLimit,
      moduleId: ticketId,
      module: 'TICKETS',
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
