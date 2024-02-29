import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetAllKnowledgeBaseArticleQuery } from '@/services/airCustomerPortal/KnowledgeBase';

export const useKnowledgeBaseDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const [searchValue, SetSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    });
  };
  const folderId = router?.query?.folderId;
  const params = {
    page: page,
    limit: pageLimit,
    search: searchValue,
    folderId: folderId,
  };
  const { data, isLoading } = useGetAllKnowledgeBaseArticleQuery(params);
  const articlesData = data?.data?.articles;
  const articlesMetaData = data?.data?.meta;

  function formatDateTime(dateString: string | number | Date) {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDateTime = new Date(dateString).toLocaleString(
      'en-GB',
      options,
    );
    return formattedDateTime;
  }

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
    handlePageChange,
    formatDateTime,
    isLoading,
    folderId,
  };
};
