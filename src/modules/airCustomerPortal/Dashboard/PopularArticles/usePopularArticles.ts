import { PAGINATION } from '@/config';
import { ARTICLE_STATUS } from '@/constants/strings';
import { useGetPopularArticlesQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const usePopularArticles = () => {
  const router = useRouter();
  const getPopularArticlesParameter = {
    queryParams: {
      page: PAGINATION?.CURRENT_PAGE,
      limit: PAGINATION?.PAGE_LIMIT,
      status: ARTICLE_STATUS?.PUBLISHED,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetPopularArticlesQuery(getPopularArticlesParameter, {
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
