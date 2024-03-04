import { PAGINATION } from '@/config';
import { useLazyGetUnapprovedArticlesQuery } from '@/services/airServices/knowledge-base/approvals';
import { useEffect, useState } from 'react';

export const useApprovals = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetUnapprovedArticlesTrigger, lazyGetUnapprovedArticlesStatus] =
    useLazyGetUnapprovedArticlesQuery();

  const getValueArticlesListData = async (pages = page) => {
    const getUnapprovedArticleParameter = {
      pathParam: {
        page: pages,
        limit: pageLimit,
      },
    };
    try {
      await lazyGetUnapprovedArticlesTrigger(
        getUnapprovedArticleParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getValueArticlesListData();
  }, [page, pageLimit]);

  return {
    setPage,
    setPageLimit,
    lazyGetUnapprovedArticlesStatus,
  };
};
