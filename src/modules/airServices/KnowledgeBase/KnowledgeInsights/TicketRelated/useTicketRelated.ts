import { PAGINATION } from '@/config';
import { useGetKnowledgeInsightsDetailsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useTicketRelated = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const router = useRouter();
  const { knowledgeInsightId } = router?.query;
  const getKnowledgeInsightsDetailsParameters = {
    queryParams: {
      page: page,
      limit: pageLimit,
      articleId: knowledgeInsightId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetKnowledgeInsightsDetailsQuery(getKnowledgeInsightsDetailsParameters, {
      refetchOnMountOrArgChange: true,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    router,
  };
};
