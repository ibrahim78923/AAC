import {
  useGetMeetingsSettingsNotificationQuery,
  usePatchMeetingsSettingsNotificationMutation,
} from '@/services/commonFeatures/meetings/settings/notifications';
import { meetingsNotificationDataDynamic } from './Notification.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';

export const useNotification = () => {
  const meetingsNotificationData = meetingsNotificationDataDynamic?.();
  const auth: any = useAuth();
  const { _id: accountId } = auth?.product?.accounts?.[ARRAY_INDEX?.ZERO];
  const apiDataParameter = {
    queryParams: {
      accountId,
    },
  };
  const { data } = useGetMeetingsSettingsNotificationQuery(apiDataParameter, {
    skip: !accountId,
    refetchOnMountOrArgChange: true,
  });

  const [
    patchMeetingsSettingsNotificationTrigger,
    patchMeetingsSettingsNotificationStatus,
  ] = usePatchMeetingsSettingsNotificationMutation();

  const toggleMeetingsNotification = async () => {
    const apiDataParameter = {
      pathParams: {
        accountId: data?.data?.accountId,
      },
      body: {},
    };
    try {
      await patchMeetingsSettingsNotificationTrigger(apiDataParameter).unwrap();
      successSnackbar('Notification Updated Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    meetingsNotificationData,
    toggleMeetingsNotification,
    patchMeetingsSettingsNotificationStatus,
  };
};
