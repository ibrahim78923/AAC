import { Box } from '@mui/material';
import ApprovalCard from './ApprovalCard';
import CustomPagination from '@/components/CustomPagination';
import { fullName } from '@/utils/avatarUtils';
import { Fragment } from 'react';
import { DataRecordCount } from '@/components/DataRecordCount';
import { useApprovals } from './useApprovals';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={() => getArticlesForApprovalsListData?.(page)}
        hasData={!hasData}
        NoDataMessage={'No approvals found'}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
      >
        {lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.map(
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
        )}
      </ApiRequestFlow>
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
