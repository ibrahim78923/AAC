import { DealsIcon, NotificationIcon, QuotesIcon } from '@/assets/icons';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
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
  const [updateSettingNotifications, { isLoading: updateLoading }] =
    useUpdateSettingNotificationsMutation();

  const notificationList = [
    {
      icon: <NotificationIcon />,
      title: 'Email',
      key: 'emailNotification',
      status: !notificationsStatus?.emailNotification,
      description: 'email notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_EMAIL_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'Companies',
      key: 'companies',
      status: !notificationsStatus?.companies,
      description: 'companies notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_COMPANIES_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'Campaigns',
      key: 'campaigns',
      status: !notificationsStatus?.campaigns,
      description: 'campaigns notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_CAMPAIGNS_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'PaidAds',
      key: 'paidAds',
      status: !notificationsStatus?.paidAds,
      description: 'paidAds notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_PAIDADS_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'SocialMarketing',
      key: 'socialMarketing',
      status: !notificationsStatus?.socialMarketing,
      description: 'socialMarketing notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_SOCIALMARKETING_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'SMSMarketing',
      key: 'smsMarketing',
      status: !notificationsStatus?.smsMarketing,
      description: 'smsMarketing notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_SMSMARKETING_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'WhatsappMarketing',
      key: 'whatsappMarketing',
      status: !notificationsStatus?.whatsappMarketing,
      description: 'whatsappMarketing notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_WHATSAPPMARKETING_NOTIFICATIONS,
    },
    {
      icon: <DealsIcon />,
      title: 'LeadCapture',
      key: 'leadCapture',
      status: !notificationsStatus?.leadCapture,
      description: 'leadCapture notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_LEADCAPTURE_NOTIFICATIONS,
    },
    {
      icon: <QuotesIcon />,
      title: 'Reports',
      key: 'reportsMarketing',
      status: !notificationsStatus?.reportsMarketing,
      description: 'reports notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_REPORT_NOTIFICATIONS,
    },
    {
      icon: <QuotesIcon />,
      title: 'Setting',
      key: 'setting',
      status: !notificationsStatus?.setting,
      description: 'Setting notification will be sent to your inbox.',
      permission:
        AIR_MARKETER_SETTINGS_PERMISSIONS?.ACTIVE_INACTIVE_SETTING_NOTIFICATIONS,
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
      enqueueSnackbar(
        `${item} Notifications ${notifyVal === false ? 'OFF' : 'ON'}`,
        {
          variant: 'success',
        },
      );
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
    updateLoading,
  };
};

export default useNotification;
