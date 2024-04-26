import { PAGINATION } from '@/config';
import { useGetKnowledgeInsightsDetailsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { useState } from 'react';

export const useTicketRelated = (props: any) => {
  const { selectedArticle } = props;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const getKnowledgeInsightsDetailsParameters = {
    queryParams: {
      page: page,
      limit: pageLimit,
      articleId: selectedArticle?._id,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess, error } =
    useGetKnowledgeInsightsDetailsQuery(getKnowledgeInsightsDetailsParameters, {
      refetchOnMountOrArgChange: true,
      skip: !!!selectedArticle?._id,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    error,
  };
};
