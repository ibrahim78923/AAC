import { PAGINATION } from '@/config';
import {
  useLazyGetUnapprovedArticlesQuery,
  usePostArticleApprovalMutation,
} from '@/services/airServices/knowledge-base/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useApprovals = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetUnapprovedArticlesTrigger, lazyGetUnapprovedArticlesStatus] =
    useLazyGetUnapprovedArticlesQuery();

  const [postArticleApprovalTrigger, postArticleApprovalStatus] =
    usePostArticleApprovalMutation();

  const getValueArticlesListData = async (currentPage = page) => {
    const getUnapprovedArticleParameter = {
      queryParams: {
        page: currentPage,
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

  const postApproval = async (id: any) => {
    const postApprovalParameters = {
      pathParams: {
        id,
      },
    };

    try {
      await postArticleApprovalTrigger(postApprovalParameters)?.unwrap();
      successSnackbar('Article approved successfully');
      setPage?.(
        lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length === 1
          ? 1
          : page,
      );
      const newPage =
        lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length === 1
          ? 1
          : page;
      await getValueArticlesListData?.(newPage);
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    setPage,
    setPageLimit,
    lazyGetUnapprovedArticlesStatus,
    postApproval,
    postArticleApprovalStatus,
  };
};
