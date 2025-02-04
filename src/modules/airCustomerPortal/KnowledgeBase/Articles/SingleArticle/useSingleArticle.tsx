import { useMemo } from 'react';
import { getActiveAccountSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { useGetSingleKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

export const useSingleArticle = () => {
  const router = useRouter();
  const companyIdStorage = useMemo(() => {
    const product: any = getActiveAccountSession();
    return product?.company?._id;
  }, []);

  const { sessionCompanyId } = useMemo(() => {
    const session: any = getSession();
    const sessionData = {
      sessionCompanyId: session?.user?.companyId,
      sessionUserId: session?.user?._id,
    };
    return sessionData;
  }, []);

  const { articlesRoute } = router?.query;
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

  const folderId = router?.query?.folderId;
  const singleArticleId = router?.query?.articleId;
  const params = {
    id: singleArticleId,
    companyId: decryptedId || companyIdStorage || sessionCompanyId,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleKnowledgeBaseArticleQuery(params, {
      refetchOnMountOrArgChange: true,
      skip: !!!singleArticleId,
    });

  const singleArticlesData = data?.data;
  const showLoader = isLoading || isFetching;

  const handlePageBack = () => {
    const pathname =
      articlesRoute === MODULE_TYPE?.REGISTER_DASHBOARD
        ? AIR_CUSTOMER_PORTAL?.CUSTOMER_PORTAL_DASHBOARD
        : articlesRoute === MODULE_TYPE?.NON_REGISTER_DASHBOARD
          ? AIR_CUSTOMER_PORTAL?.NON_REGISTER_DASHBOARD
          : AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL;
    router?.push({
      pathname,
      query: { folderId, ...(companyId && { companyId }) },
    });
  };

  return {
    singleArticlesData,
    showLoader,
    isError,
    refetch,
    handlePageBack,
  };
};
