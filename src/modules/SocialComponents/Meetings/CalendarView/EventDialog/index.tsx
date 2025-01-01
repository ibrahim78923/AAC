import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import { DATE_TIME_FORMAT } from '@/constants';
import { EventDataI } from './EventDialog.interface';
import { otherDateFormat } from '@/lib/date-time';
import { TruncateText } from '@/components/TruncateText';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const EventDialog = ({
  openEventModal,
  setOpenEventModal,
  eventData,
  theme,
}: EventDataI) => {
  const { startDate, startTime, endTime } =
    eventData?.event?._def?.extendedProps;

  const handleJoinClick = () => {
    const joinUrl = eventData?.event?._def?.extendedProps?.joinUrl;
    if (joinUrl) {
      window?.open(joinUrl, '_blank');
    }
  };

  const dateAndTime = `${otherDateFormat(
    startDate,
    DATE_TIME_FORMAT?.DDMMYYY,
  )} - ${startTime} to ${endTime}`;

  return (
    <CustomCommonDialog
      isPortalOpen={openEventModal}
      closePortal={() => setOpenEventModal(false)}
      dialogTitle={
        <Typography variant="h4" display={'flex'} gap={1}>
          Calender -{' '}
          <TruncateText
            text={eventData?.event?._def?.extendedProps?.email}
            size={30}
          />
        </Typography>
      }
      showActionButtons={false}
    >
      <Box>
        <Typography variant="h6" m={1}>
          {eventData?._def?.extendedProps?.data?.meetingTitle}
        </Typography>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{
            margin: '0 .5rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box sx={{ margin: 1 }}>
          <Typography variant="body1" mb={0.4}>
            {dateAndTime}
          </Typography>
          <Button variant="contained" onClick={handleJoinClick}>
            Join Now
          </Button>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{
            margin: '0 .5rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box sx={{ margin: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginBottom: 0.4,
            }}
          >
            <Avatar
              sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
              src={generateImage(eventData?.event?._def?.extendedProps?.avatar)}
            />
            <Typography variant="body1">
              {eventData?.event?._def?.extendedProps?.userName} invited you.
            </Typography>
          </Box>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{
            margin: '0 .5rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Typography variant="body1" m={1}>
          Meetings with {eventData?.event?._def?.extendedProps?.people?.length}
        </Typography>
      </Box>
    </CustomCommonDialog>
  );
};
