import { useGetRecentTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const useRecentTickets = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetRecentTicketsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
  };
};
