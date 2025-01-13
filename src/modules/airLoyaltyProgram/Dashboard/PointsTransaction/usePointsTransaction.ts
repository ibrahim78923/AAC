import { useAppSelector } from '@/redux/store';
import { useGetLoyaltyDashboardPointTransactionsQuery } from '@/services/airLoyaltyProgram/dashboard';
import { PAGINATION } from '@/config';
import { getPointsTransactionColumns } from './PointsTransaction.data';
import { useState } from 'react';

export const usePointsTransaction = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const { loyaltyDashboardDateRange } = useAppSelector(
    (state) => state?.loyaltyProgramDashboard,
  );

  const queryParams = {
    dateFrom: loyaltyDashboardDateRange?.startDate,
    dateTo: loyaltyDashboardDateRange?.endDate,
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

  const pointsTransactionColumns = getPointsTransactionColumns();
  return {
    pointsTransactionColumns,
    fulfilledTimeStamp,
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
