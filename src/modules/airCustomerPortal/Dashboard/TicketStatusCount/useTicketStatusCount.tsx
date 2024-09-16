import { useGetCustomerDashboardDataQuery } from '@/services/airCustomerPortal';
import { ticketsCountsDataDynamic } from '../WelcomeCard/WelcomeCard.data';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerDashboardDataQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const ticketsCountsData = ticketsCountsDataDynamic(data?.ticketsCount);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    ticketsCountsData,
    refetch,
  };
};
