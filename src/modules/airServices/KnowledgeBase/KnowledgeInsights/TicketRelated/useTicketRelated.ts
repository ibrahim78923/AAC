import { PAGINATION } from '@/config';
import { useGetServicesKnowledgeBaseSingleKnowledgeInsightsDetailsQuery } from '@/services/airServices/knowledge-base/knowledge-insights';
import { useState } from 'react';
import { TicketRelatedPropsI } from './TicketRelated.interface';

export const useTicketRelated = (props: TicketRelatedPropsI) => {
  const { selectedArticle } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const getKnowledgeInsightsDetailsParameters = {
    queryParams: {
      page: page,
      limit: pageLimit,
      articleId: selectedArticle?._id,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess, error, refetch } =
    useGetServicesKnowledgeBaseSingleKnowledgeInsightsDetailsQuery(
      getKnowledgeInsightsDetailsParameters,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!selectedArticle?._id,
      },
    );

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
