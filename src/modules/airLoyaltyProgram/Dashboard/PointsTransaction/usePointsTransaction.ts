import { useAppSelector } from '@/redux/store';
import { useGetLoyaltyDashboardPointTransactionsQuery } from '@/services/airLoyaltyProgram/dashboard';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';
import { useApiPolling } from '@/hooks/useApiPolling';
import { AUTO_REFRESH_API_TIME_INTERVAL, PAGINATION } from '@/config';
import { getPointsTransactionColumns } from './PointsTransaction.data';
import { useState } from 'react';

export const usePointsTransaction = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const { loyaltyDashboardDateRange } = useAppSelector(
    (state) => state?.loyaltyProgramDashboard,
  );

  const queryParams = {
    dateFrom:
      loyaltyDashboardDateRange?.startDate &&
      otherDateFormat(
        loyaltyDashboardDateRange?.startDate,
        CALENDAR_FORMAT?.YMD,
      ),
    dateTo:
      loyaltyDashboardDateRange?.endDate &&
      otherDateFormat(loyaltyDashboardDateRange?.endDate, CALENDAR_FORMAT?.YMD),
    page,
    limit,
  };
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    fulfilledTimeStamp,
    refetch,
  } = useGetLoyaltyDashboardPointTransactionsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const ApiPollingHookProps = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };
  const { timeLapse } = useApiPolling(ApiPollingHookProps);

  const pointsTransactionColumns = getPointsTransactionColumns();
  return {
    pointsTransactionColumns,
    timeLapse,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    refetch,
    setPage,
    setLimit,
  };
};
