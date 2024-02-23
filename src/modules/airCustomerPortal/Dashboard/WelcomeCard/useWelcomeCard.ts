import { useGetCustomerDashboardDataQuery } from '@/services/airCustomerPortal';

export const useWelcomeCard = () => {
  const { data, isLoading, isFetching, isError } =
    useGetCustomerDashboardDataQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
