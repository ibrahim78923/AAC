import useAuth from '@/hooks/useAuth';
import {
  useGetEmailNotificationQuery,
  usePatchEmailNotificationMutation,
} from '@/services/airServices/settings/account-settings/email-notification';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export default function useTasks() {
  const [switchLoading, setSwitchLoading] = useState<any>({});

  const auth: any = useAuth();
  const { _id: accountId } = auth?.product?.accounts?.[0];

  const { data, isLoading, isFetching, isError } = useGetEmailNotificationQuery(
    {
      accountId,
    },
    { skip: !accountId, refetchOnMountOrArgChange: true },
  );

  const [patchEmailTrigger] = usePatchEmailNotificationMutation();

  const onSwitchChange = async (_id: any) => {
    setSwitchLoading({ ...switchLoading, [_id]: true });

    const updatedData = {
      ...data?.data?.notificationsOff,
      [_id]: !data?.data?.notificationsOff?.[_id],
    };

    const patchData = {
      accountId,
      data: { notificationsOff: updatedData },
    };

    try {
      await patchEmailTrigger(patchData)?.unwrap();
      successSnackbar('Notification Updated Successfully');
    } catch (error) {
      errorSnackbar();
    } finally {
      setSwitchLoading({ ...switchLoading, [_id]: false });
    }
  };

  return {
    isError,
    isLoading,
    isFetching,
    switchLoading,
    onSwitchChange,
    data,
  };
}
