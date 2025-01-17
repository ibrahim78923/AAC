import { Box, Typography } from '@mui/material';
import { useActivity } from './useActivity';
import CustomPagination from '@/components/CustomPagination';
import { PAGINATION } from '@/config';
import { FiberManualRecord } from '@mui/icons-material';
import { DATE_TIME_FORMAT } from '@/constants';
import { ActivityCard } from '@/components/Cards/ActivityCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const Activity = () => {
  const {
    isLoading,
    isError,
    setPageLimit,
    setPage,
    isFetching,
    data: activityData,
    refetch,
  } = useActivity();

  return (
    <>
      <Typography variant="h5" color={'slateBlue.main'} my={1}>
        Activities
      </Typography>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasNoData={!activityData?.data?.activitylogs?.length}
        hasError={isError}
        refreshApi={refetch}
        noDataMessage="No activities found"
      >
        {activityData?.data?.activitylogs?.map((singleActivity: any) => (
          <>
            <Box
              border={'1px solid'}
              borderColor={'custom.off_white_three'}
              borderRadius={2}
              py={2}
            >
              <ActivityCard
                key={singleActivity?._id}
                firstName={singleActivity?.performedByName}
                activityType={singleActivity?.activityType}
                moduleName={singleActivity?.moduleName}
                dateFormat={DATE_TIME_FORMAT?.DD_MM_YYYY_hh_mm_A}
                activityDate={singleActivity?.createdAt}
                Icon={<FiberManualRecord fontSize="small" color="primary" />}
              />
            </Box>
          </>
        ))}
        <CustomPagination
          count={activityData?.data?.meta?.pages}
          totalRecords={activityData?.data?.meta?.total}
          pageLimit={activityData?.data?.meta?.limit}
          currentPage={activityData?.data?.meta?.page}
          rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
          onPageChange={(page: number) => setPage(page)}
          setPageLimit={setPageLimit}
          setPage={setPage}
        />
      </ApiRequestFlow>
    </>
  );
};
