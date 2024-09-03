import { useState } from 'react';
import { useGetActivityLogForSingleTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { PAGINATION } from '@/config';
import { MODULE_TYPE } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';

export const useActivities = () => {
  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);

  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching, refetch } =
    useGetActivityLogForSingleTicketsQuery(
      {
        page,
        limit: pageLimit,
        moduleId: ticketId,
        module: MODULE_TYPE?.TICKETS,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !!!ticketId,
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
