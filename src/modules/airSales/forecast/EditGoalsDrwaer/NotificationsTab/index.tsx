import { Box, Checkbox, Typography, useTheme } from '@mui/material';

const NotificationsTab = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        mb={2}
        variant="body1"
        fontWeight={'600'}
        color={theme?.palette?.slateBlue?.main}
      >
        Select Notifications
      </Typography>
      <Box display={'flex'}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            Goal kick-off
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Receive a notification when the goal has started.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} mt={2}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            {' '}
            Goal becomes
            <span
              style={{
                marginLeft: '10px',
                borderRadius: '20px',
                padding: '2px 8px',
                background: theme?.palette?.custom?.light_blue_bg,
                color: theme?.palette?.custom?.bright,
              }}
            >
              Exceeded
            </span>
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Receive a notification when goal exceeded 100% of the target by the
            duration of the goal.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} mt={2}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            Goal becomes
            <span
              style={{
                marginLeft: '10px',
                borderRadius: '20px',
                padding: '2px 8px',
                background: theme?.palette?.custom?.light_green_bg,
                color: theme?.palette?.success?.main,
              }}
            >
              Achieved
            </span>
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Receive a notification when goal reached 100% of the target by the
            duration of the goal.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} mt={2}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            Goal becomes
            <span
              style={{
                marginLeft: '10px',
                borderRadius: '20px',
                padding: '2px 8px',
                background: theme?.palette?.custom?.light_red_bg,
                color: theme?.palette?.error?.main,
              }}
            >
              Exceeded
            </span>
          </Typography>
          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Receive a notification when goal didn’t 100% of the target by the
            duration of the goal.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationsTab;
