import { useAppSelector } from '@/redux/store';
import { useGetLoyaltyDashboardTopConsumerQuery } from '@/services/airLoyaltyProgram/dashboard';
import { PAGINATION } from '@/config';
import { useState } from 'react';
import { getTopConsumersColumns } from './TopConsumer.data';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';

export const useTopConsumer = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const router = useRouter();
  const { loyaltyDashboardDateRange } = useAppSelector(
    (state) => state?.loyaltyProgramDashboard,
  );

  const queryParams = {
    dateFrom: loyaltyDashboardDateRange?.startDate,
    dateTo: loyaltyDashboardDateRange?.endDate,
    topConsumer: true,
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
  } = useGetLoyaltyDashboardTopConsumerQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const handleConsumerClick = (id: string) => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.UPSERT_CONSUMER,
      query: { id },
    });
  };
  const topConsumersColumns = getTopConsumersColumns(handleConsumerClick);

  return {
    topConsumersColumns,
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
