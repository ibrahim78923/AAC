import { useGetCustomerDashboardDataQuery } from '@/services/airCustomerPortal';
import { ticketsCountsDataDynamic } from './WelcomeCard.data';

export const useWelcomeCard = () => {
  const { data, isLoading, isFetching, isError } =
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
  };
};
