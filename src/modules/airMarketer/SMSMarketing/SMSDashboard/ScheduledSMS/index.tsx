import { Box, Button, Typography } from '@mui/material';

import useScheduledSMS from './useScheduledSMS';

import { styles } from './ScheduledSMS.style';

const ScheduledSMS = () => {
  const { theme } = useScheduledSMS();
  return (
    <Box sx={styles.scheduledSMSCardStyle}>
      <Box sx={styles.scheduledSMSHeader}>
        <Typography variant="h4" sx={styles.heading(theme)}>
          Scheduled SMS
        </Typography>
        <Button variant="contained">View All</Button>
      </Box>
    </Box>
  );
};

export default ScheduledSMS;
