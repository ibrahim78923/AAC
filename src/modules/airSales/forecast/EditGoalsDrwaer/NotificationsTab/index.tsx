import { Box, Checkbox, Typography, useTheme } from '@mui/material';
import { uuid } from 'uuidv4';

const NotificationsTab = ({
  editNotificationOptions,
  handleCheckboxChange,
}: any) => {
  const theme = useTheme();

  // Define the notification options
  const notificationOptions = [
    { label: 'Goal kick-off', value: 'goalStarted' },
    { label: 'Goal becomes Exceeded', value: 'goalExceeded' },
    { label: 'Goal becomes Achieved', value: 'goalAchieved' },
    { label: 'Goal becomes Missed', value: 'goalMissed' },
  ];

  const notificationStyles = {
    goalExceeded: {
      background: theme?.palette?.custom?.light_blue_bg,
      color: theme?.palette?.custom?.bright,
    },
    goalAchieved: {
      background: theme?.palette?.custom?.light_green_bg,
      color: theme?.palette?.success?.main,
    },
    goalMissed: {
      background: theme?.palette?.custom?.light_red_bg,
      color: theme?.palette?.error?.main,
    },
  };

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
      {notificationOptions?.map((option) => {
        const labelKey = option?.value;
        return (
          <Box display={'flex'} mt={2} key={uuid()}>
            <Checkbox
              checked={editNotificationOptions?.includes(option?.value)}
              onChange={() => handleCheckboxChange(option?.value)}
            />
            <Box>
              <Typography
                variant="body1"
                color={theme?.palette?.slateBlue?.main}
              >
                {option?.label?.includes('Goal becomes') ? (
                  <>
                    {option?.label?.split('Goal becomes')[0]} Goal becomes
                    <span
                      style={{
                        marginLeft: '10px',
                        borderRadius: '20px',
                        padding: '2px 8px',
                        ...notificationStyles[labelKey],
                      }}
                    >
                      {option?.label?.split('Goal becomes')[1]?.trim()}
                    </span>
                  </>
                ) : (
                  option?.label
                )}
              </Typography>
              <Typography variant="body3" color={theme?.palette?.custom?.main}>
                {option?.label === 'Goal kick-off'
                  ? 'Receive a notification when the goal has started.'
                  : option?.label === 'Goal becomes Exceeded'
                    ? 'Receive a notification when the goal exceeds 100% of the target by the duration of the goal.'
                    : option?.label === 'Goal becomes Achieved'
                      ? 'Receive a notification when the goal reaches 100% of the target by the duration of the goal.'
                      : 'Receive a notification when the goal didn’t reach 100% of the target by the duration of the goal.'}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default NotificationsTab;
