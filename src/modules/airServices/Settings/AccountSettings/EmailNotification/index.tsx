import { Box, Divider, Typography } from '@mui/material';
import { EmailNotificationDetailTabs } from './EmailNotificationDetailTabs';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const EmailNotification = () => {
  const router = useRouter();
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
            })
          }
        />
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
