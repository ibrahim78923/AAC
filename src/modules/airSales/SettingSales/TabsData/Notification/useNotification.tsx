import { DealsIcon, QuotesIcon } from '@/assets/icons';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import {
  useGetSettingNotificationsQuery,
  useUpdateSettingNotificationsMutation,
} from '@/services/airSales/settings/notifications/notifications';
import { getActiveAccountSession } from '@/utils';
import { Theme, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const useNotification = () => {
  const theme = useTheme<Theme>();

  const ActiveAccount = getActiveAccountSession();
  const { data: notificationListData, isLoading: getDataLoading } =
    useGetSettingNotificationsQuery({ accountId: ActiveAccount?._id });
  const notificationsStatus = notificationListData?.data?.notificationsOff;
  const [updateSettingNotifications] = useUpdateSettingNotificationsMutation();

  const notificationList = [
    {
      icon: <DealsIcon />,
      title: 'Deals',
      key: 'deals',
      status: !notificationsStatus?.deals,
      description: 'Deals notification will be sent to your inbox.',
      permission: AIR_SALES_SETTINGS?.ACTIVE_INACTIVE_DEALS_NOTIFICATION,
    },
    {
      icon: <DealsIcon />,
      title: 'Forecast',
      key: 'forecast',
      status: !notificationsStatus?.forcasts,
      description: 'Forecast notification will be sent to your inbox.',
      permission: '',
    },
    {
      icon: <QuotesIcon />,
      title: 'Quotes',
      key: 'quotes',
      status: !notificationsStatus?.quotes,
      description: 'Quotes notification will be sent to your inbox.',
      permission: AIR_SALES_SETTINGS?.ACTIVE_INACTIVE_QUOTES_NOTIFICATION,
    },
    {
      icon: <DealsIcon />,
      title: 'Tasks',
      key: 'tasks',
      status: !notificationsStatus?.deals,
      description: 'Tasks notification will be sent to your inbox.',
      permission: '',
    },
    {
      icon: <DealsIcon />,
      title: 'Invoices',
      key: 'invoices',
      status: !notificationsStatus?.invoices,
      description: 'Invoices notification will be sent to your inbox.',
      permission: '',
    },
    {
      icon: <DealsIcon />,
      title: 'Reports',
      key: 'reports',
      status: !notificationsStatus?.reports,
      description: 'Reports notification will be sent to your inbox.',
      permission: '',
    },
    {
      icon: <DealsIcon />,
      title: 'Settings',
      key: 'settings',
      status: !notificationsStatus?.settings,
      description: 'Settings notification will be sent to your inbox.',
      permission: '',
    },
  ];

  const handleSwitchNotifications = async (val: any, item: any) => {
    const notifyVal = val?.target?.checked;
    const notificationParams = {
      notificationsOff: {
        [item]: !notifyVal,
      },
    };
    try {
      await updateSettingNotifications({
        id: ActiveAccount?._id,
        body: notificationParams,
      })?.unwrap();
      enqueueSnackbar('Status updated successfully', {
        variant: 'success',
      });
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    theme,
    notificationList,
    getDataLoading,
    handleSwitchNotifications,
    notificationsStatus,
  };
};

export default useNotification;
