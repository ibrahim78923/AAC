import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { XlFileImg } from '@/assets/images';
import Image from 'next/image';
import { truncateText } from '@/utils/avatarUtils';

export const EventDialog = (params: any) => {
  const { openEventModal, setOpenEventModal, eventData } = params;
  const theme: any = useTheme();
  return (
    <Dialog
      open={openEventModal}
      onClose={() => setOpenEventModal(false)}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={2}
          mb={1.5}
        >
          <Typography variant="h4">
            Calender - {eventData?.data?.email}
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenEventModal(false)}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" m={1}>
          {eventData?.data?.meetingTitle}
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
            {eventData?.data?.date}
            {' - '}
            {eventData?.data?.startTime} to {eventData?.data?.endTime}
          </Typography>
          <Typography variant="body1" mb={0.4}>
            Microsoft teams meeting
          </Typography>
          <Button variant="contained">Join Now</Button>
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
              variant="rounded"
              src={''}
              alt={''}
              sx={{
                bgcolor: 'primary.light',
                p: 1.2,
                width: 20,
                height: 20,
                borderRadius: '50%',
              }}
            />
            <Typography variant="body1">
              {eventData?.data?.invitedBy} invited you.
            </Typography>
          </Box>
          <Typography variant="body1">
            Accepted {eventData?.data?.accepted}, didn’t respond{' '}
            {eventData?.data?.notResponding}
          </Typography>
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
          Meetings with all {eventData?.data?.listeners}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: 1,
            border: `.1rem solid ${theme?.palette?.grey?.[0]}`,
            borderRadius: 2,
            margin: 1,
            maxWidth: '45%',
          }}
        >
          <Image src={XlFileImg} alt={''} />
          <Typography variant="body1">
            {truncateText(eventData?.data?.attachment)}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
