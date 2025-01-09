import { useAppSelector } from '@/redux/store';
import { useGetLoyaltyDashboardRewardsQuery } from '@/services/airLoyaltyProgram/dashboard';
import { useApiPolling } from '@/hooks/useApiPolling';
import { AUTO_REFRESH_API_TIME_INTERVAL, PAGINATION } from '@/config';
import { getRewardsColumns } from './Rewards.data';
import { useState } from 'react';

export const useGiftCards = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const { loyaltyDashboardDateRange } = useAppSelector(
    (state) => state?.loyaltyProgramDashboard,
  );

  const queryParams = {
    activeFrom: loyaltyDashboardDateRange?.startDate,
    activeTo: loyaltyDashboardDateRange?.endDate,
    limit,
    page,
  };
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    fulfilledTimeStamp,
    refetch,
  } = useGetLoyaltyDashboardRewardsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const ApiPollingHookProps = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };
  const { timeLapse } = useApiPolling(ApiPollingHookProps);

  const rewardsColumns = getRewardsColumns();
  return {
    rewardsColumns,
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
