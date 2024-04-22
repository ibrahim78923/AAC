import { Typography, Box, Divider, Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CirclePlusIcon, ViewDetailVuesaxIcon } from '@/assets/icons';
import { styles } from './DetailViewTimeEntries.style';
import { DetailTicketDrawer } from './DetailTicketDrawer';
import Image from 'next/image';
import { VuesaxErrorImage } from '@/assets/images';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useDetailViewTimeEntries } from './useDetailViewTimeEntries';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import StopWatch from './StopWatch';
import { fullName, generateImage } from '@/utils/avatarUtils';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { ERROR_TIME } from '@/constants/api-mapped';

const DetailViewTimeEntries = (data: any) => {
  const {
    isLoading,
    timeEntryData,
    isDrawerOpen,
    setIsDrawerOpen,
    isIconVisible,
    setIsIconVisible,
    toggleView,
    start,
    stop,
    reset,
    handleSubmit,
    handleSubmitPause,
    seconds,
    minutes,
    hours,
  } = useDetailViewTimeEntries(data);

  return (
    <>
      <Box borderRadius={2} border={1} borderColor={'custom.off_white_three'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
        >
          <Box sx={styles?.timeEnterInnerGrid}>
            <Typography variant="h5" component="span">
              Time Entries
            </Typography>
          </Box>
          <Box sx={styles?.timeEnterInnerGrid}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TIME_TRACK_PLAY_PAUSE,
              ]}
            >
              <Box sx={styles?.iconBoxStyling} onClick={toggleView}>
                {isIconVisible ? (
                  <Box onClick={handleSubmitPause}>
                    <ViewDetailVuesaxIcon />
                  </Box>
                ) : (
                  <Box onClick={handleSubmit}>
                    <Image
                      src={VuesaxErrorImage}
                      alt={'VuesaxErrorImage'}
                      height={24}
                      width={24}
                    />
                  </Box>
                )}
              </Box>
              <Box sx={styles?.iconBoxTimerStyling}>
                <StopWatch seconds={seconds} minutes={minutes} hours={hours} />
              </Box>
            </PermissionsGuard>
            <Box sx={styles?.buttonStyleOFTimeEntries}>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TIME_ENTRIES_DETAILS,
                ]}
              >
                <Button
                  variant="contained"
                  onClick={() => setIsDrawerOpen(true)}
                  startIcon={<CirclePlusIcon />}
                >
                  Add Time
                </Button>
              </PermissionsGuard>
              {isDrawerOpen && (
                <DetailTicketDrawer
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                  data={data}
                  start={start}
                  stop={stop}
                  reset={reset}
                  setIsIconVisible={setIsIconVisible}
                  isLoading={isLoading}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={styles?.timeEnterInnerBox}>
          <Typography variant="body1"> Total Time track</Typography>
          <Typography variant="body1" component="span" sx={{ ml: '4rem' }}>
            {timeEntryData?.data?.totalTimeTrack === ERROR_TIME?.NAN_HOUR_MIN
              ? '0h0m'
              : timeEntryData?.data?.totalTimeTrack}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent="start"
          m="2rem"
          sx={{ overflow: 'auto', maxHeight: '18rem' }}
        >
          {timeEntryData?.data ? (
            timeEntryData?.data?.response?.map((item: any) => (
              <Box key={item?._id}>
                <Box display="flex" mt={'1rem'} mb={'2rem'}>
                  <Avatar src={generateImage(item?.avatar?.url)} />
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ ml: '1rem', mt: '0.5rem' }}
                  >
                    {fullName(
                      item?.agentDetails?.firstName,
                      item?.agentDetails?.lastName,
                    )}
                  </Typography>
                </Box>

                <Box display="flex" mt={'1rem'} mb={'2rem'}>
                  <Typography variant="body1"> Time Tracker </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ ml: '4rem' }}
                  >
                    {dayjs(item?.totalTimeTrack)?.format(
                      TIME_FORMAT?.TIME_VALIDATION,
                    ) ?? '-'}
                    {item?.counter}
                  </Typography>
                </Box>

                {!!!item?.counter ? (
                  <>
                    <Box display="flex" mt={'1rem'} mb={'2rem'}>
                      <Typography variant="body1"> Start Time</Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ ml: '6.5rem' }}
                      >
                        {dayjs(item?.startTime)?.format(
                          TIME_FORMAT?.TIME_VALIDATION,
                        ) ?? '-'}
                      </Typography>
                    </Box>
                    <Box display="flex" mt={'1rem'} mb={'2rem'}>
                      <Typography variant="body1"> End Time </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ ml: '7rem' }}
                      >
                        {dayjs(item?.endTime)?.format(
                          TIME_FORMAT?.TIME_VALIDATION,
                        ) ?? '-'}
                      </Typography>
                    </Box>
                  </>
                ) : null}
                <Box
                  display="flex"
                  mt={'1rem'}
                  mb={'1rem'}
                  justifyContent={'end'}
                >
                  <Typography variant="subtitle1">
                    {dayjs(item?.on)?.format(DATE_TIME_FORMAT?.WDM) ?? '-'}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  mt={'1rem'}
                  mb={'1rem'}
                  justifyContent={'end'}
                >
                  <Typography variant="body1">
                    {dayjs(item?.on)?.format(TIME_FORMAT?.UI) ?? '-'}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <SkeletonForm />
          )}
        </Box>
      </Box>
    </>
  );
};

export default DetailViewTimeEntries;
