import { useGetServicesDashboardTicketsInfoCountsQuery } from '@/services/airServices/dashboard';
import { ticketDashboardCardsData } from './TicketStatusCount.data';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesDashboardTicketsInfoCountsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const apiCallInProgress = isLoading || isFetching;
  const ticketDashboardCards = ticketDashboardCardsData(data?.data);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    apiCallInProgress,
    ticketDashboardCards,
  };
};
