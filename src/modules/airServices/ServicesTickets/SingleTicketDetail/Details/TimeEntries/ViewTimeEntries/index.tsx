import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { ERROR_TIME } from '@/constants/api-mapped';
import { fullName, generateImage } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import { useViewTimeEntries } from './useViewTimeEntries';
import { otherDateFormat } from '@/lib/date-time';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';

export const ViewTimeEntries = () => {
  const { isLoading, isError, timeEntryData, isFetching, refetch } =
    useViewTimeEntries();

  return (
    <>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 2 }}>
          <Typography variant="body1" color="slateBlue.main">
            {' '}
            Total Time track
          </Typography>
          {isLoading || isFetching ? (
            <CustomLinearProgress />
          ) : (
            <Typography variant="body1" color="slateBlue.main">
              {timeEntryData?.data?.totalTimeTrack === ERROR_TIME?.NAN_HOUR_MIN
                ? '0h0m'
                : timeEntryData?.data?.totalTimeTrack}
            </Typography>
          )}
        </Box>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
          noDataMessage="No time entries found"
          hasNoData={!!!timeEntryData?.data?.response?.length}
        >
          <Box sx={{ overflow: 'auto', maxHeight: '18rem' }}>
            {timeEntryData?.data?.response?.map((item: any) => (
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
                    {!!item?.startTime
                      ? otherDateFormat(
                          item?.startTime,
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
                    {!!item?.endTime
                      ? otherDateFormat(
                          item?.endTime,
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
                    {!!item?.on
                      ? otherDateFormat(item?.on, DATE_TIME_FORMAT?.WDM)
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
                    {!!item?.on
                      ? otherDateFormat(item?.on, TIME_FORMAT?.UI)
                      : '---'}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </ApiRequestFlow>
      </>
    </>
  );
};
