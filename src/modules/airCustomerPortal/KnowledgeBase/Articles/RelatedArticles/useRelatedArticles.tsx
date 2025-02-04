import { useGetAllKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { useMemo } from 'react';
import { getActiveAccountSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

export const useRelatedArticles = () => {
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

  const relatedArticlesParams = {
    folderId,
    status: ARTICLE_STATUS?.PUBLISHED,
    companyId: decryptedId || companyIdStorage || sessionCompanyId,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllKnowledgeBaseArticleQuery(relatedArticlesParams, {
      refetchOnMountOrArgChange: true,
      skip: !!!folderId,
    });

  const relatedArticlesData = data?.data?.articles?.filter(
    (article: any) => article?._id !== singleArticleId,
  );

  const showLoader = isLoading || isFetching;

  const handleRelatedArticles = (articleId: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
      query: {
        articleId: articleId,
        folderId: folderId,
        ...(companyId && { companyId }),
      },
    });
  };

  return {
    relatedArticlesData,
    isError,
    refetch,
    showLoader,
    companyId,
    handleRelatedArticles,
  };
};
