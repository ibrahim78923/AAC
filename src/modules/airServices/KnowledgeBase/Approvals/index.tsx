import { Box } from '@mui/material';
import NoData from '@/components/NoData';
import ApprovalCard from './ApprovalCard';
import CustomPagination from '@/components/CustomPagination';
import { fullName } from '@/utils/avatarUtils';
import ApiErrorState from '@/components/ApiErrorState';
import { Fragment } from 'react';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { DataRecordCount } from '@/components/DataRecordCount';
import { useApprovals } from './useApprovals';

export const Approvals = () => {
  const {
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
  } = useApprovals();

  return (
    <Box sx={{ mt: 2 }}>
      <DataRecordCount
        isCountLoading={showLoader}
        totalCount={hasData}
        recordName=" Approvals"
      />
      <br />
      {showLoader ? (
        <SkeletonCard gridSize={{ md: 12 }} flexDirection={'row-reverse'} />
      ) : isError ? (
        <ApiErrorState
          canRefresh
          refresh={() => getArticlesForApprovalsListData?.(page)}
        />
      ) : !hasData ? (
        <NoData message={'No approvals found'} />
      ) : (
        lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.map(
          (approval: any) => (
            <Fragment key={approval?._id}>
              <ApprovalCard
                title={approval?.title}
                folder={approval?.folder?.name}
                author={fullName(
                  approval?.author?.firstName,
                  approval?.author?.lastName,
                )}
                sendApproval={() => postApproval?.(approval?._id)}
                disabled={postArticleApprovalStatus?.isLoading}
                isLoading={
                  postArticleApprovalStatus?.isLoading &&
                  postArticleApprovalStatus?.originalArgs?.pathParams?.id ===
                    approval?._id
                }
              />
            </Fragment>
          ),
        )
      )}
      <br />
      <CustomPagination
        count={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.limit}
        currentPage={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.page}
        totalRecords={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.total}
        onPageChange={(page: number) => setPage?.(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </Box>
  );
};
