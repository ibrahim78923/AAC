import { useGetCustomerPortalDashboardRecentTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const useRecentTickets = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalDashboardRecentTicketsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const companyId = router?.query?.companyId;
  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
    companyId,
  };
};
