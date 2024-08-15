import { PAGINATION } from '@/config';
import { useGetKnowledgeInsightsDetailsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { useState } from 'react';
import { TicketRelatedPropsI } from './TicketRelated.interface';

export const useTicketRelated = (props: TicketRelatedPropsI) => {
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

  const { data, isLoading, isFetching, isError, isSuccess, error, refetch } =
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
    refetch,
  };
};
