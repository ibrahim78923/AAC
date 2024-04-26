import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileValidationSchema, profileDefaultValues } from './Profile.data';
import { usePatchProfileDetailMutation } from '@/services/airServices/settings/account-settings/account-details';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const useProfile = (props: any) => {
  const { profileDetail } = props;
  const router = useRouter();
  const user: any = useAuth();

  const profileMethods = useForm<any>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValues(profileDetail),
  });
  const [patchProfileDetailTrigger, patchProfileDetailProgress] =
    usePatchProfileDetailMutation();
  const isLoading = patchProfileDetailProgress?.isLoading;

  const isSubmit = async (data: any) => {
    const payload = {
      id: user?.user?._id,
      body: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.workPhoneNumber,
        mobileNumber: data?.mobileNumber,
        language: data?.language,
        timezone: data?.timeZone?.label ?? data?.timeZone,
        status: 'ACTIVE',
        jobTitle: data?.jobTitle,
        facebookUrl: data?.facebookURL,
        twitterUrl: data?.twitterURL,
        liveStatus: 'AVAILABLE',
        linkedInUrl: data?.linkedinURL,
      },
    };
    try {
      const res: any = await patchProfileDetailTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Account Details Update Successfully');
      reset(profileDefaultValues(null));
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleMoveBack = () => {
    router?.push({
      pathname: AIR_SERVICES?.ACCOUNT_SETTINGS,
    });
  };

  const handleCancel = () => {
    handleMoveBack();
    reset(profileDefaultValues(null));
  };

  const { handleSubmit, reset } = profileMethods;
  const handleSubmitProfile = handleSubmit(isSubmit);

  return {
    profileMethods,
    handleSubmitProfile,
    isLoading,
    handleCancel,
  };
};
