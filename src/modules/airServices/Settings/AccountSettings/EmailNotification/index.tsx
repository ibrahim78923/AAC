import { Box, Divider, Typography } from '@mui/material';
import { EmailNotificationDetailTabs } from './EmailNotificationDetailTabs';
import BackArrow from '@/assets/icons/modules/airSales/deals/back-arrow';

export const EmailNotification = () => {
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <BackArrow />
        <Typography variant="h3">Email Notification</Typography>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      <Box mt={2}>
        <EmailNotificationDetailTabs />
      </Box>
    </Box>
  );
};
