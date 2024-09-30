import {
  useGetServicesAccountSettingsEmailNotificationQuery,
  usePatchServicesAccountSettingsEmailNotificationMutation,
} from '@/services/airServices/settings/account-settings/email-notification';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useMemo, useState } from 'react';
import { ISwitchLoadingState } from '../EmailNotification.interface';

import { getActiveAccountSession } from '@/utils';

export default function usePurchaseOrders() {
  const [switchLoading, setSwitchLoading] = useState<ISwitchLoadingState>({});

  const product = useMemo(() => getActiveAccountSession(), []);
  const accountId = product?._id;

  const { data, isLoading, isFetching, isError } =
    useGetServicesAccountSettingsEmailNotificationQuery(
      {
        accountId,
      },
      { skip: !accountId, refetchOnMountOrArgChange: true },
    );

  const [patchEmailTrigger] =
    usePatchServicesAccountSettingsEmailNotificationMutation();

  const onSwitchChange = async (_id: string) => {
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
