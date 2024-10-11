import { PAGINATION } from '@/config';
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';
import { useGetCustomerPortalDashboardPopularArticlesQuery } from '@/services/airCustomerPortal';
import { getActiveProductSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const usePopularArticles = () => {
  const router = useRouter();
  const product = getActiveProductSession();
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.accounts?.[ARRAY_INDEX?.ZERO]?.company?._id;

  const { companyId } = router?.query;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);

  const getCustomerPortalDashboardPopularArticlesParameter = {
    queryParams: {
      page: PAGINATION?.CURRENT_PAGE,
      limit: PAGINATION?.PAGE_LIMIT,
      status: ARTICLE_STATUS?.PUBLISHED,
      companyId: decryptedId || companyIdStorage || sessionId,
    },
  };
  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalDashboardPopularArticlesQuery(
      getCustomerPortalDashboardPopularArticlesParameter,
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
    refetch,
    companyId,
  };
};
