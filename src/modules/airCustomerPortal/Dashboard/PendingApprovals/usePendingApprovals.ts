import { useGetPopularArticlesQuery } from '@/services/airCustomerPortal';

export const usePendingApprovals = () => {
  const getPopularArticlesParameter = {
    queryParams: {
      page: 1,
      limit: 10,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetPopularArticlesQuery(
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
