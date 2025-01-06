import { useGetServicesDashboardTicketsInfoCountsQuery } from '@/services/airServices/dashboard';
import { ticketDashboardCardsData } from './TicketStatusCount.data';
import { AUTO_REFRESH_API_POLLING_TIME } from '@/config';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesDashboardTicketsInfoCountsQuery(null, {
      refetchOnMountOrArgChange: true,
      pollingInterval: AUTO_REFRESH_API_POLLING_TIME?.DASHBOARD,
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
