import { useGetServicesDashboardTicketsInfoCountsQuery } from '@/services/airServices/dashboard';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesDashboardTicketsInfoCountsQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
