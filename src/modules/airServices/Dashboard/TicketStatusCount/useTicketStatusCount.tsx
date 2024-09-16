import { useGetDashboardCardsTicketsQuery } from '@/services/airServices/dashboard';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardCardsTicketsQuery(null, {
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
