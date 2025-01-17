import { useState } from 'react';
import { useGetSingleServicesTicketsActivityLogsQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { PAGINATION } from '@/config';
import { NextRouter, useRouter } from 'next/router';
import { ACTIVITY_LOGS_MODULE } from '@/constants/activity-logs';

export const useActivities = () => {
  const router: NextRouter = useRouter();
  const ticketId = router?.query?.ticketId as string;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching, refetch } =
    useGetSingleServicesTicketsActivityLogsQuery(
      {
        page,
        limit: pageLimit,
        moduleId: ticketId,
        module: ACTIVITY_LOGS_MODULE?.TICKETS,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !!!ticketId,
      },
    );

  const activityData = data?.data?.activitylogs ?? [];
  const showLoader = isLoading || isFetching;

  return {
    isError,
    setPageLimit,
    setPage,
    data,
    refetch,
    activityData,
    showLoader,
  };
};
