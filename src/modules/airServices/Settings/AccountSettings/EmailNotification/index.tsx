import { Box, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { EmailNotificationDetailTabs } from './EmailNotificationDetailTabs';

export const EmailNotification = () => {
  const router = useRouter();

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBackIcon
          sx={{ cursor: 'pointer', color: 'custom.light' }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
            })
          }
        />
        <Typography variant={'h4'} color={'blue.main'}>
          Email Notification
        </Typography>
      </Box>

      <Divider sx={{ mt: 2 }} />

      <EmailNotificationDetailTabs />
    </>
  );
};
