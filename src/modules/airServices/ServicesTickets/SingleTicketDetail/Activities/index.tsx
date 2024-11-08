import { Box, Typography } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import ApiErrorState from '@/components/ApiErrorState';
import { useActivities } from './useActivities';
import { DATE_TIME_FORMAT } from '@/constants';
import NoData from '@/components/NoData';
import { TruncateText } from '@/components/TruncateText';
import { LogInfo } from '@/components/LogInfo';
import { fullName } from '@/utils/avatarUtils';
import { otherDateFormat } from '@/lib/date-time';
import { FiberManualRecord } from '@mui/icons-material';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

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
        <SkeletonForm flexDirection={'column-reverse'} />
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
        borderColor={'custom.off_white_three'}
        borderRadius={2}
        p={2}
      >
        {activityData?.map((activity: any) => (
          <Box key={activity?._id} mb={2} display={'flex'} gap={2}>
            <Box mt={0.3}>
              <FiberManualRecord fontSize="small" color="primary" />
            </Box>
            <Box>
              <LogInfo
                performer={fullName(activity?.performedByName)}
                logType={`has ${activity?.activityType?.toLowerCase()}`}
                log={<TruncateText text={activity?.moduleName} />}
              />
              <Box display={'flex'} gap={1} flexWrap={'wrap'}>
                <Typography variant="body2" color="textPrimary">
                  {otherDateFormat(
                    activity?.createdAt,
                    DATE_TIME_FORMAT?.DD_MM_YYYY_hh_mm_A,
                  )}
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
