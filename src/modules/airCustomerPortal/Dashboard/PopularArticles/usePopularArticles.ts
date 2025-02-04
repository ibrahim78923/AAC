import { PAGINATION } from '@/config';
import { ARRAY_INDEX, ARTICLE_STATUS, MODULE_TYPE } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useGetCustomerPortalDashboardPopularArticlesQuery } from '@/services/airCustomerPortal';
import { getActiveAccountSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const usePopularArticles = () => {
  const router = useRouter();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;

  const auth = useAuth();
  const articlesRoute = auth?.isAuthenticated
    ? MODULE_TYPE?.REGISTER_DASHBOARD
    : MODULE_TYPE?.NON_REGISTER_DASHBOARD;

  const { companyId } = router?.query;

  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId?.[ARRAY_INDEX?.ZERO]
      : companyId;
    if (!id) return null;
    try {
      return atob(id);
    } catch (error) {
      return null;
    }
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
    articlesRoute,
  };
};
