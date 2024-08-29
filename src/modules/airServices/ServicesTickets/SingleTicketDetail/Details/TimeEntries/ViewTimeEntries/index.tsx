import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { ERROR_TIME } from '@/constants/api-mapped';
import { fullName, generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useViewTimeEntries } from './useViewTimeEntries';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const ViewTimeEntries = () => {
  const { isLoading, isError, timeEntryData, isFetching, refetch } =
    useViewTimeEntries();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <>
        <Box display={'flex'} py={2}>
          <Typography variant="body1" color="slateBlue.main">
            {' '}
            Total Time track
          </Typography>
          <Typography
            variant="body1"
            color="slateBlue.main"
            sx={{ ml: '4rem' }}
          >
            {timeEntryData?.data?.totalTimeTrack === ERROR_TIME?.NAN_HOUR_MIN
              ? '0h0m'
              : timeEntryData?.data?.totalTimeTrack}
          </Typography>
        </Box>
        <Box sx={{ overflow: 'auto', maxHeight: '18rem' }}>
          {!!timeEntryData?.data?.response?.length ? (
            timeEntryData?.data?.response?.map((item: any) => (
              <Box key={item?._id}>
                <Box
                  display="flex"
                  alignItems={'center'}
                  gap={2}
                  flexWrap={'wrap'}
                >
                  <Avatar
                    src={generateImage(item?.agentDetails?.avatar?.url)}
                  />
                  <Typography variant="body1" color="slateBlue.main">
                    {fullName(
                      item?.agentDetails?.firstName,
                      item?.agentDetails?.lastName,
                    )}
                  </Typography>
                </Box>
                <br />
                <Box
                  display="flex"
                  alignItems={'center'}
                  gap={4}
                  flexWrap={'wrap'}
                >
                  <Typography
                    variant="body1"
                    color="slateBlue.main"
                    flex={{ md: 0.15, lg: 0.1 }}
                  >
                    {' '}
                    Time Tracker{' '}
                  </Typography>
                  <Typography variant="body1" color="slateBlue.main">
                    {item?.totalTimeTrack ?? '---'}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems={'center'}
                  gap={4}
                  flexWrap={'wrap'}
                  my={2}
                >
                  <Typography
                    variant="body1"
                    color="slateBlue.main"
                    flex={{ md: 0.15, lg: 0.1 }}
                  >
                    {' '}
                    Start Time
                  </Typography>
                  <Typography variant="body1" color="slateBlue.main">
                    {item?.startTime
                      ? dayjs(item?.startTime)?.format(
                          TIME_FORMAT?.TIME_VALIDATION,
                        )
                      : '---'}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems={'center'}
                  gap={4}
                  flexWrap={'wrap'}
                >
                  <Typography
                    variant="body1"
                    color="slateBlue.main"
                    flex={{ md: 0.15, lg: 0.1 }}
                  >
                    {' '}
                    End Time{' '}
                  </Typography>
                  <Typography variant="body1" color="slateBlue.main">
                    {item?.endTime
                      ? dayjs(item?.endTime)?.format(
                          TIME_FORMAT?.TIME_VALIDATION,
                        )
                      : '---'}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  mt={'1rem'}
                  mb={'1rem'}
                  justifyContent={'end'}
                >
                  <Typography variant="subtitle1">
                    {item?.on
                      ? dayjs(item?.on)?.format(DATE_TIME_FORMAT?.WDM)
                      : '---'}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  mt={'1rem'}
                  mb={'1rem'}
                  justifyContent={'end'}
                >
                  <Typography variant="body1">
                    {item?.on
                      ? dayjs(item?.on)?.format(TIME_FORMAT?.UI)
                      : '---'}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <NoData message="No time entries found" height="100%" />
          )}
        </Box>
      </>
    </>
  );
};
