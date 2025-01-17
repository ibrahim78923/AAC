import { Box, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { useActivities } from './useActivities';
import { DATE_TIME_FORMAT } from '@/constants';
import { FiberManualRecord } from '@mui/icons-material';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ActivityCard } from '@/components/Cards/ActivityCard';

export const Activities = () => {
  const {
    isError,
    setPageLimit,
    setPage,
    data,
    refetch,
    activityData,
    showLoader,
  } = useActivities();

  return (
    <>
      <Typography variant="h5" color={'slateBlue.main'} my={1}>
        Activities
      </Typography>
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasNoData={!activityData?.length}
        hasError={isError}
        refreshApi={refetch}
        noDataMessage="No activities Found"
      >
        <Box
          border={'1px solid'}
          borderColor={'custom.off_white_three'}
          borderRadius={2}
          py={2}
        >
          {activityData?.map((activity: any) => (
            <ActivityCard
              key={activity?._id}
              firstName={activity?.performedByName}
              activityType={activity?.activityType}
              moduleName={activity?.moduleName}
              dateFormat={DATE_TIME_FORMAT?.DD_MM_YYYY_hh_mm_A}
              activityDate={activity?.createdAt}
              Icon={<FiberManualRecord fontSize="small" color="primary" />}
            />
          ))}
        </Box>
        <CustomPagination
          count={data?.data?.meta?.pages}
          totalRecords={data?.data?.meta?.total}
          pageLimit={data?.data?.meta?.limit}
          currentPage={data?.data?.meta?.page}
          onPageChange={(page: number) => setPage(page)}
          setPageLimit={setPageLimit}
          setPage={setPage}
        />
      </ApiRequestFlow>
    </>
  );
};
