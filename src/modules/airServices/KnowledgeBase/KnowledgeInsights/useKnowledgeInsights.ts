import { useRouter } from 'next/router';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetKnowledgeInsightsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { knowledgeInsightsColumnsDynamic } from './KnowledgeInsights.data';

export const useKnowledgeInsights = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const router = useRouter();
  const { knowledgeInsightId } = router?.query;
  const getKnowledgeInsightsParameters = {
    queryParams: {
      page: page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetKnowledgeInsightsQuery(getKnowledgeInsightsParameters, {
      refetchOnMountOrArgChange: true,
    });

  const knowledgeInsightsColumns = knowledgeInsightsColumnsDynamic?.(router);
  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    knowledgeInsightsColumns,
    knowledgeInsightId,
  };
};
