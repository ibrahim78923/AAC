import { useState } from 'react';
import { useGetSingleServicesTicketsActivityLogsQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { PAGINATION } from '@/config';
import { MODULE_TYPE } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';

const { TICKETS } = MODULE_TYPE ?? {};
const { CURRENT_PAGE, PAGE_LIMIT } = PAGINATION ?? {};

export const useActivities = () => {
  const router: NextRouter = useRouter();
  const ticketId = router?.query?.ticketId as string;
  const [page, setPage] = useState<number>(CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);

  const { data, isLoading, isError, isFetching, refetch } =
    useGetSingleServicesTicketsActivityLogsQuery(
      {
        page,
        limit: pageLimit,
        moduleId: ticketId,
        module: TICKETS,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !!!ticketId,
      },
    );

  const activityData = data?.data?.activitylogs ?? [];
  const apiCallInProgress = isLoading || isFetching;

  return {
    isError,
    setPageLimit,
    setPage,
    data,
    refetch,
    activityData,
    apiCallInProgress,
  };
};
