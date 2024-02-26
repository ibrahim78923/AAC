import { useState } from 'react';
import dayjs from 'dayjs';
import { useGetActivityLogQuery } from '@/services/airServices/tickets/single-ticket-details/activities';
import { useTheme } from '@mui/material';

export const useActivity = () => {
  const theme = useTheme();

  const [page, setPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(10);
  const { data, isLoading, isError, isSuccess } = useGetActivityLogQuery({
    page,
    limit: pageLimit,
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
          dayjs(activity?.createdAt)?.format('ddd, D MMM, YYYY h:mm A')) ||
        '---',
      timeTwo: activity?.activityType || '---',
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
    theme,
  };
};
