import { Box, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { emailNotificationDetailsTabData } from './EmailNotification.data';
import { Tickets } from './Tickets';
import { Assets } from './Assets';
import { Contracts } from './Contracts';
import { Tasks } from './Tasks';
import { PurchaseOrders } from './PurchaseOrders';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

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

      <HorizontalTabs tabsDataArray={emailNotificationDetailsTabData}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_TICKETS_EMAIL_NOTIFICATION,
          ]}
        >
          <Tickets />
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_ASSETS_EMAIL_NOTIFICATION,
          ]}
        >
          <Assets />
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_CONTRACTS_EMAIL_NOTIFICATION,
          ]}
        >
          <Contracts />
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_TASKS_EMAIL_NOTIFICATION,
          ]}
        >
          <Tasks />
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_ENABLE_PURCHASE_ORDER_EMAIL_NOTIFICATION,
          ]}
        >
          <PurchaseOrders />
        </PermissionsGuard>
      </HorizontalTabs>
    </>
  );
};
