import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { emailNotificationDetailsTabData } from './EmailNotification.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_SERVICES } from '@/constants/routes';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const EmailNotification = () => {
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        title="Email Notification"
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
          })
        }
      />
      <Divider sx={{ mt: 2 }} />

      <PermissionsTabs tabsDataArray={emailNotificationDetailsTabData} />
    </>
  );
};
