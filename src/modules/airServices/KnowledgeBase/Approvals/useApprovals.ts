import { PAGINATION } from '@/config';
import { useGetUnapprovedArticlesQuery } from '@/services/airServices/knowledge-base/articles';
import { useState } from 'react';

export const useApprovals = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getUnapprovedArticleParameter = {
    pathParam: {
      page,
      limit: pageLimit,
    },
  };

  const { data, isLoading, isFetching } = useGetUnapprovedArticlesQuery(
    getUnapprovedArticleParameter,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return {
    data,
    isLoading,
    isFetching,
    setPage,
    setPageLimit,
  };
};
