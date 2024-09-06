import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useGetAllKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { PAGINATION } from '@/config';
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';

export const useKnowledgeBaseDetail = () => {
  const router = useRouter();
  const [searchValue, SetSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

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

  const { folderId } = router?.query;

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue,
    folderId: folderId,
    status: ARTICLE_STATUS?.PUBLISHED,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllKnowledgeBaseArticleQuery(params, {
      refetchOnMountOrArgChange: true,
      skip: !!!folderId,
    });
  const articlesData = data?.data?.articles;
  const articlesMetaData = data?.data?.meta;
  const folderName = data?.data?.articles?.[ARRAY_INDEX?.ZERO]?.folder?.name;

  return {
    handleKnowledgeBase,
    SetSearchValue,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    isLoading,
    folderName,
    isFetching,
    isError,
    refetch,
  };
};
