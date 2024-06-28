import { Typography, Box, Divider, Avatar } from '@mui/material';
import { StartTimerIcon } from '@/assets/icons';
import { AddTime } from '../AddTime';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useDetailViewTimeEntries } from './useTimeEntries';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import StopWatch from './StopWatch';
import { fullName, generateImage } from '@/utils/avatarUtils';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { ERROR_TIME } from '@/constants/api-mapped';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PauseIcon from '@mui/icons-material/Pause';
import { LoadingButton } from '@mui/lab';
import { pxToRem } from '@/utils/getFontValue';
import { ARRAY_INDEX } from '@/constants/strings';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';

export const TimeEntries = (data: any) => {
  const {
    isLoading,
    isError,
    timeEntryData,
    isDrawerOpen,
    setIsDrawerOpen,
    start,
    stop,
    reset,
    seconds,
    minutes,
    hours,
    user,
    isTimerPause,
    toggleTimerPlayPause,
    postTicketsTimeStatus,
    putTicketsTimeStatus,
    isFetching,
    theme,
  } = useDetailViewTimeEntries(data);

  return (
    <>
      <Box
        borderRadius={2}
        border={1}
        borderColor={'custom.off_white_three'}
        px={2}
        py={1}
      >
        <br />
        <Box>
          <PageTitledHeader
            title="Time Entries"
            handleAction={() => setIsDrawerOpen(true)}
            addTitle="Add Time"
            disableAddButton={!isTimerPause}
            createPermissionKey={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TIME_ENTRIES_DETAILS,
            ]}
          >
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TIME_TRACK_PLAY_PAUSE,
              ]}
            >
              <LoadingButton
                sx={{ cursor: 'pointer', p: 0, minWidth: pxToRem(40) }}
                variant="outlined"
                color="inherit"
                size="small"
                className="small"
                disabled={
                  data?.data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails?._id !==
                  user?._id
                }
                loading={
                  postTicketsTimeStatus?.isLoading ||
                  putTicketsTimeStatus?.isLoading
                }
                onClick={() => toggleTimerPlayPause?.()}
              >
                {isTimerPause ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <StartTimerIcon
                      color={
                        data?.data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails
                          ?._id === user?._id
                          ? theme?.palette?.primary?.main
                          : theme?.palette?.custom?.dark
                      }
                    />
                  </Box>
                ) : (
                  <PauseIcon
                    sx={{
                      color:
                        data?.data?.data?.[ARRAY_INDEX?.ZERO]?.agentDetails
                          ?._id === user?._id
                          ? theme?.palette?.error?.main
                          : '',
                      fontWeight: 'bold',
                    }}
                  />
                )}
              </LoadingButton>
            </PermissionsGuard>
            <StopWatch seconds={seconds} minutes={minutes} hours={hours} />
          </PageTitledHeader>
        </Box>
        <Divider />
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : isError ? (
          <ApiErrorState />
        ) : (
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
                {timeEntryData?.data?.totalTimeTrack ===
                ERROR_TIME?.NAN_HOUR_MIN
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
        )}
      </Box>
      {isDrawerOpen && (
        <AddTime
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={data}
          start={start}
          stop={stop}
          reset={reset}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </>
  );
};
