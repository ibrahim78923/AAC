import { useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useGetActivityLogQuery } from '@/services/airServices/tickets/single-ticket-details/activities';

export const useActivities = () => {
  const ticketId = useSearchParams()?.get('ticketId');

  const [page, setPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(10);
  const { data, isLoading, isError, isSuccess } = useGetActivityLogQuery({
    page,
    limit: pageLimit,
    moduleId: ticketId,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const activitiesData =
    data?.data?.activitylogs?.map((activity: any) => ({
      createdBy: activity?.performedByName || '---',
      createdByOne:
        `${activity?.activityType} ${activity?.moduleName}` || '---',
      timeOne:
        (activity?.createdAt &&
          dayjs(activity?.createdAt)?.format('DD MMMM, YYYY')) ||
        '---',
      timeTwo:
        (activity?.createdAt && dayjs(activity?.createdAt)?.format('HH:MM')) ||
        '----',
    })) || [];

  const paginationData = data?.data?.meta;

  return {
    isLoading,
    isError,
    isSuccess,
    activitiesData,
    handlePageChange,
    paginationData,
    pageLimit,
    page,
    setPageLimit,
    setPage,
  };
};
