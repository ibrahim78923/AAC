import { useGetRecentTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const useRecentTickets = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetRecentTicketsQuery(null, {
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
