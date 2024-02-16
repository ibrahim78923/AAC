import { Box, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import ApprovalCard from './ApprovalCard';
import { useApprovals } from './useApprovals';
import CustomPagination from '@/components/CustomPagination';
import { PAGINATION } from '@/config';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const Approvals = () => {
  const { data, isLoading, isFetching, setPage, setPageLimit } = useApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <Box sx={{ mt: 2 }}>
      {!!!data?.data?.articles?.length ? (
        <NoData message={'No approvals found'} />
      ) : (
        <>
          <Typography variant="h5" fontWeight={500} mb={1}>
            {`Approvals ${
              !!data?.data?.articles?.length
                ? `(${data?.data?.articles?.length})`
                : ''
            }`}
          </Typography>
          {data?.data?.articles?.map((approval: any) => (
            <ApprovalCard
              key={approval?._id}
              title={approval?.title}
              folder={approval?.folder}
              author={approval?.author}
              approvalStatus={approval?.approvalStatus}
            />
          ))}
          <br />
          <br />
          <CustomPagination
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
            currentPage={data?.data?.meta?.page}
            totalRecords={data?.data?.meta?.total}
            onPageChange={(page: any) => setPage?.(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}
    </Box>
  );
};
