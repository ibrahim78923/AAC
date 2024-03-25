import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetAllKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { PAGINATION } from '@/config';

export const useKnowledgeBaseDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const [searchValue, SetSearchValue] = useState<string>('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    });
  };

  const { folderId } = router?.query;

  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue,
    folderId: folderId,
  };

  const { data, isLoading, isFetching, isError } =
    useGetAllKnowledgeBaseArticleQuery(params, {
      refetchOnMountOrArgChange: true,
      skip: !!!folderId,
    });
  const articlesData = data?.data?.articles;
  const articlesMetaData = data?.data?.meta;
  const folderName = data?.data?.articles?.[0]?.folder?.name;
  return {
    handleKnowledgeBase,
    searchValue,
    SetSearchValue,
    theme,
    page,
    pageLimit,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    isLoading,
    folderId,
    folderName,
    isFetching,
    isError,
  };
};
