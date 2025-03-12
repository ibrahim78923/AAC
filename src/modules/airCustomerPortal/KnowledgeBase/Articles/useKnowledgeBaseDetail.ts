import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useGetAllKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { PAGINATION } from '@/config';
import { ARRAY_INDEX } from '@/constants/strings';
import { getActiveAccountSession, getSession } from '@/utils';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ARTICLE_STATUS } from '@/constants/services';

export const useKnowledgeBaseDetail = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;

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

  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
      query: {
        ...(router?.query?.companyId && {
          companyId: router?.query?.companyId,
        }),
      },
    });
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchValue(data);
  };

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue,
    folderId: router?.query?.folderId,
    companyId: decryptedId || companyIdStorage || sessionId,
    status: ARTICLE_STATUS?.PUBLISHED,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllKnowledgeBaseArticleQuery(params, {
      refetchOnMountOrArgChange: true,
      skip: !!!router?.query?.folderId,
    });
  const articlesData = data?.data?.articles;
  const articlesMetaData = data?.data?.meta;

  return {
    handleKnowledgeBase,
    handleSearch,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
