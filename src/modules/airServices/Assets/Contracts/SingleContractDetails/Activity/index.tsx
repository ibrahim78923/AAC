import { Box } from '@mui/material';
import { ActivityTimeline } from './ActivityTimeline';
import { useActivity } from './useActivity';
import CustomPagination from '@/components/CustomPagination';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const Activity = () => {
  const {
    isLoading,
    isError,
    setPageLimit,
    setPage,
    isFetching,
    data,
    refetch,
  } = useActivity();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
      hasNoData={!data?.data?.activitylogs?.length}
      noDataMessage={'There is no activity'}
    >
      <Box
        border={'1px solid'}
        borderColor={'custom.off_white_three'}
        borderRadius={2}
        p={2}
      >
        {data?.data?.activitylogs?.map((singleActivity: any) => (
          <ActivityTimeline
            activityData={singleActivity}
            key={singleActivity?._id}
          />
        ))}
      </Box>

      <CustomPagination
        count={data?.data?.meta?.pages}
        totalRecords={data?.data?.meta?.total}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        onPageChange={(page: any) => setPage(page)}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </ApiRequestFlow>
  );
};
