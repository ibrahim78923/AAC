import useAuth from '@/hooks/useAuth';
import { usePatchServiceAccountDetailProfileAvatarMutation } from '@/services/airServices/settings/account-settings/account-details';
// import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { IAuth } from '../AccountDetails.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useHeader = () => {
  const router = useRouter();
  const user: IAuth | any = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const fullScreenPosition = { top: 0, left: 0, right: 0, bottom: 0 };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!!!event?.target?.files?.length) return;
    isSubmit(event?.target?.files?.[0]);
  };

  const [patchProfileAvatarTrigger, patchProfileAvatarStatus] =
    usePatchServiceAccountDetailProfileAvatarMutation();
  const isSubmit = async (file: any) => {
    const reportAnIssueData = new FormData();
    reportAnIssueData?.append('avatar', file);

    const payload = {
      id: user?.user?._id,
      removeAvatar: false,
      body: reportAnIssueData,
    };
    try {
      const res = await patchProfileAvatarTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Profile Update Successfully');
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    handleFileChange,
    isHovered,
    setIsHovered,
    fullScreenPosition,
    router,
    patchProfileAvatarStatus,
  };
};
