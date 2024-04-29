import BlockQuoteIcon from '@/assets/icons/shared/block-quote-icon';
import MessageNotificationIcon from '@/assets/icons/shared/message-notification-icon';
import { AntSwitch } from '@/components/AntSwitch';
import { Box, Typography } from '@mui/material';

export const Notification = () => {
  return (
    <Box>
      <Typography variant="h3">Notifications</Typography>
      <Box
        border="1px solid"
        borderColor="grey.700"
        borderRadius="5px"
        marginTop="2rem"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          m="1rem"
        >
          <Box display="flex" gap="10px" alignItems="center">
            <Box
              bgcolor="primary.light"
              padding={0.5}
              borderRadius={2}
              display="flex"
              alignItems="center"
            >
              <MessageNotificationIcon />
            </Box>
            <Box>
              <Typography variant="h5">Email</Typography>
              <Typography>
                Get an email notification whenever an event is scheduled
              </Typography>
            </Box>
          </Box>
          <Box>
            <AntSwitch />
          </Box>
        </Box>
      </Box>
      <Box
        border="1px solid"
        borderColor="grey.700"
        borderRadius="5px"
        marginTop="2rem"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          m="1rem"
        >
          <Box display="flex" gap="10px" alignItems="center">
            <Box
              bgcolor="primary.light"
              padding={0.5}
              borderRadius={2}
              display="flex"
              alignItems="center"
            >
              <BlockQuoteIcon />
            </Box>
            <Box>
              <Typography variant="h5">Text Reminder</Typography>
              <Typography>
                Get a text reminder whenever an event is scheduled
              </Typography>
            </Box>
          </Box>
          <Box>
            <AntSwitch />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
