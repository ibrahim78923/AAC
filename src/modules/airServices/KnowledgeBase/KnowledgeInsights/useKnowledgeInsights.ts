import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetKnowledgeInsightsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { knowledgeInsightsColumnsDynamic } from './KnowledgeInsights.data';

export const useKnowledgeInsights = () => {
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [selectedArticle, setSelectedArticle] = useState<any>({});

  const getKnowledgeInsightsParameters = {
    queryParams: {
      page: page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetKnowledgeInsightsQuery(getKnowledgeInsightsParameters, {
      refetchOnMountOrArgChange: true,
    });

  const knowledgeInsightsColumns =
    knowledgeInsightsColumnsDynamic?.(setSelectedArticle);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    knowledgeInsightsColumns,
    selectedArticle,
    setSelectedArticle,
    refetch,
  };
};
