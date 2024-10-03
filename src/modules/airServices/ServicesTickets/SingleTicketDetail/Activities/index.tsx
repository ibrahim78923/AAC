import { Box, IconButton, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import ApiErrorState from '@/components/ApiErrorState';
import { useActivities } from './useActivities';
import { TIME_FORMAT } from '@/constants';
import NoData from '@/components/NoData';
import { otherDateFormat, uiDateFormat } from '@/utils/dateTime';
import { TruncateText } from '@/components/TruncateText';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { LogInfo } from '@/components/LogInfo';

export const Activities = () => {
  const {
    isError,
    setPageLimit,
    setPage,
    data,
    refetch,
    activityData,
    apiCallInProgress,
  } = useActivities();

  if (apiCallInProgress)
    return (
      <Box
        border={'1px solid'}
        borderColor={'custom.off_white'}
        borderRadius={2}
        p={2}
      >
        <SkeletonCard
          gridSize={{ md: 12 }}
          hasThirdSkeleton={false}
          circularSkeletonSize={{ width: 25, height: 25 }}
          outerPadding={{ x: 0, y: 0 }}
        />
      </Box>
    );

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;
  if (!!!activityData?.length)
    return (
      <>
        <Typography variant="h5" color={'slateBlue.main'} my={1}>
          Activities
        </Typography>
        <Box
          border={'1px solid'}
          borderColor={'custom.off_white'}
          borderRadius={2}
          p={2}
        >
          <NoData height="40vh" message="No activities found" />
        </Box>
      </>
    );

  return (
    <>
      <Typography variant="h5" color={'slateBlue.main'} my={1}>
        Activities
      </Typography>
      <Box
        border={'1px solid'}
        borderColor={'custom.off_white'}
        borderRadius={2}
        p={2}
      >
        {activityData?.map((activity: any) => (
          <Box key={activity?._id} mb={2} display={'flex'} gap={2}>
            <Box>
              <IconButton
                disabled
                color="primary"
                sx={{
                  border: `1px solid`,
                  borderColor: 'primary.main',
                }}
              ></IconButton>
            </Box>
            <Box>
              <LogInfo
                performer={activity?.performedByName?.toLowerCase()}
                logType={`has ${activity?.activityType?.toLowerCase()}`}
                log={<TruncateText text={activity?.moduleName} />}
              />
              <Box display={'flex'} gap={1}>
                <Typography variant="body2" color="textPrimary">
                  {uiDateFormat(activity?.createdAt)}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {otherDateFormat(activity?.createdAt, TIME_FORMAT?.UI)}
                </Typography>
              </Box>
            </Box>
          </Box>
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
    </>
  );
};
