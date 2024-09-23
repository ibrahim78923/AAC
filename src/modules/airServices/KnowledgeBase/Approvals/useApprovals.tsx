import { PAGINATION } from '@/config';
import {
  useLazyGetUnapprovedArticlesQuery,
  usePostArticleApprovalMutation,
} from '@/services/airServices/knowledge-base/approvals';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useApprovals = () => {
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const [lazyGetUnapprovedArticlesTrigger, lazyGetUnapprovedArticlesStatus] =
    useLazyGetUnapprovedArticlesQuery();

  const [postArticleApprovalTrigger, postArticleApprovalStatus] =
    usePostArticleApprovalMutation();

  const getArticlesForApprovalsListData = async (
    currentPage: number = page,
  ) => {
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
    getArticlesForApprovalsListData();
  }, [page, pageLimit]);

  const postApproval = async (id: string) => {
    const postApprovalParameters = {
      pathParams: {
        id,
      },
    };

    try {
      await postArticleApprovalTrigger(postApprovalParameters)?.unwrap();
      successSnackbar('Article approved successfully');
      const newPage =
        lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length ===
        PAGINATION?.CURRENT_PAGE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getArticlesForApprovalsListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const showLoader =
    lazyGetUnapprovedArticlesStatus?.isLoading ||
    lazyGetUnapprovedArticlesStatus?.isFetching;
  const isError = lazyGetUnapprovedArticlesStatus?.isError;
  const hasData = lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length;

  return {
    lazyGetUnapprovedArticlesStatus,
    setPage,
    setPageLimit,
    postApproval,
    postArticleApprovalStatus,
    getArticlesForApprovalsListData,
    page,
    hasData,
    showLoader,
    isError,
  };
};
