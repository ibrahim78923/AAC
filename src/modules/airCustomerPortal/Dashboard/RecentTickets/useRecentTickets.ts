import { useGetRecentTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const useRecentTickets = () => {
  const router = useRouter();
  const getPopularArticlesParameter = {
    queryParams: {
      page: 1,
      limit: 10,
      metaData: true,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetRecentTicketsQuery(
    getPopularArticlesParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
  };
};
