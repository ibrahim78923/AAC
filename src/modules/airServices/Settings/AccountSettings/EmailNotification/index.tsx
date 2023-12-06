import { Box, Divider, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { EmailNotificationDetailTabs } from './EmailNotificationDetailTabs';

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
      <Divider sx={{ my: 2 }} />
      <EmailNotificationDetailTabs />
    </Box>
  );
};
