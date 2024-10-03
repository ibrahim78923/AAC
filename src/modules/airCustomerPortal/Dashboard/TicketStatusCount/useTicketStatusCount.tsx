import { useGetCustomerPortalDashboardCustomerDashboardDataQuery } from '@/services/airCustomerPortal';
import { ticketsCountsDataDynamic } from '../WelcomeCard/WelcomeCard.data';
import { styles } from '../WelcomeCard/WelcomeCard.style';

export const useTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalDashboardCustomerDashboardDataQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const ticketsCountsData = ticketsCountsDataDynamic(data?.ticketsCount);

  const { ticketCardWrapper } = styles;

  return {
    data,
    isLoading,
    isFetching,
    isError,
    ticketsCountsData,
    refetch,
    ticketCardWrapper,
  };
};
