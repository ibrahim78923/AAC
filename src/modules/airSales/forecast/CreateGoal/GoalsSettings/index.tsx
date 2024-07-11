import { Box, Checkbox, Typography, useTheme } from '@mui/material';

const GoalsSettings = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={'600'}
        color={theme?.palette?.slateBlue?.main}
      >
        What notifications would you like to add?
      </Typography>
      <Typography
        mb={2}
        variant="body2"
        color={theme?.palette?.slateBlue?.main}
      >
        Select the notifications to send to the goal contributors{' '}
        <b>(1 contributor) </b>
      </Typography>

      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: { xs: '15px 5px', md: '15px' },
        }}
      >
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
              Receive a notification when goal exceeded 100% of the target by
              the duration of the goal.
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
        <Box display={'flex'} mt={2} mb={10}>
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
                Missed
              </span>
            </Typography>
            <Typography variant="body3" color={theme?.palette?.custom?.main}>
              Receive a notification when goal didn’t 100% of the target by the
              duration of the goal.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GoalsSettings;
