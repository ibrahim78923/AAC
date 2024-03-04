import { Box, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import ApprovalCard from './ApprovalCard';
import { useApprovals } from './useApprovals';
import CustomPagination from '@/components/CustomPagination';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { fullName } from '@/utils/avatarUtils';

export const Approvals = () => {
  const { lazyGetUnapprovedArticlesStatus, setPage, setPageLimit } =
    useApprovals();

  if (
    lazyGetUnapprovedArticlesStatus?.isLoading ||
    lazyGetUnapprovedArticlesStatus?.isFetching
  )
    return <SkeletonForm />;

  return (
    <Box sx={{ mt: 2 }}>
      {!!!lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length ? (
        <NoData message={'No approvals found'} />
      ) : (
        <>
          <Typography variant="h5" fontWeight={500} mb={1}>
            {`Approvals ${
              !!lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length
                ? `(${lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.length})`
                : ''
            }`}
          </Typography>
          {lazyGetUnapprovedArticlesStatus?.data?.data?.articles?.map(
            (approval: any) => (
              <ApprovalCard
                key={approval?._id}
                title={approval?.title}
                folder={approval?.folder?.name}
                author={fullName(
                  approval?.author?.firstName,
                  approval?.author?.lastName,
                )}
              />
            ),
          )}
          <br />
          <br />
          <CustomPagination
            count={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.limit}
            currentPage={
              lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.page
            }
            totalRecords={
              lazyGetUnapprovedArticlesStatus?.data?.data?.meta?.total
            }
            onPageChange={(page: any) => setPage?.(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}
    </Box>
  );
};
