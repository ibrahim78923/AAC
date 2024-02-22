import { useGetRecentTicketsQuery } from '@/services/airCustomerPortal';

export const useRecentTickets = () => {
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
  };
};
