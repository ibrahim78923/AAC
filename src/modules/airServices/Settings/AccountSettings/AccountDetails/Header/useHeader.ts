import useAuth from '@/hooks/useAuth';
import { usePatchProfileAvatarMutation } from '@/services/airServices/settings/account-settings/account-details';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export const useHeader = () => {
  const router = useRouter();
  const user: any = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );
  const [isHovered, setIsHovered] = useState(false);
  const fullScreenPosition = { top: 0, left: 0, right: 0, bottom: 0 };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event?.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file: any = fileInput.files[0];
      setUploadedImage(file);
      isSubmit();
      fileInput.value = '';
    }
  };

  const [patchProfileAvatarTrigger] = usePatchProfileAvatarMutation();
  const isSubmit = async () => {
    const reportAnIssueData: any = new FormData();
    reportAnIssueData?.append('avatar', uploadedImage);

    const payload = {
      id: user?.user?._id,
      removeAvatar: false,
      body: reportAnIssueData,
    };
    try {
      const res: any = await patchProfileAvatarTrigger(payload)?.unwrap();
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
  };
};
