import { useGetPopularArticlesQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const usePopularArticles = () => {
  const router = useRouter();
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
    router,
  };
};
