import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useAddLoyaltyProgramSettingsGeneralSettingsMutation,
  useGetLoyaltyProgramSettingsGeneralSettingsQuery,
  useUpdateLoyaltyProgramSettingsGeneralSettingsMutation,
} from '@/services/airLoyaltyProgram/settings';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useGiftCards = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      giftCardMaxAmount: '',
    },
  });
  const { data, refetch, isLoading, isFetching, isError } =
    useGetLoyaltyProgramSettingsGeneralSettingsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const [
    addLoyaltyProgramSettingsGeneralSettingsTrigger,
    addLoyaltyProgramSettingsGeneralSettingsStatus,
  ] = useAddLoyaltyProgramSettingsGeneralSettingsMutation();

  const [
    updateLoyaltyProgramSettingsGeneralSettingsTrigger,
    updateLoyaltyProgramSettingsGeneralSettingsStatus,
  ] = useUpdateLoyaltyProgramSettingsGeneralSettingsMutation();

  const { handleSubmit, reset } = methods;

  const submitGiftCard = async (formData: any) => {
    const body = {
      giftCardMaxAmount: formData?.giftCardMaxAmount,
    };

    const apiDataParameter = {
      body,
    };
    if (data?.data?._id) {
      await updateGiftCard(body);
      return;
    }
    try {
      await addLoyaltyProgramSettingsGeneralSettingsTrigger?.(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Loyalty program settings added successfully');
      reset?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateGiftCard = async (formData: any) => {
    const body = {
      giftCardMaxAmount: formData?.giftCardMaxAmount,
      id: data?.data?._id,
    };

    const apiDataParameter = {
      queryParams: body,
    };

    try {
      await updateLoyaltyProgramSettingsGeneralSettingsTrigger?.(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Loyalty program settings updated successfully');
      reset?.();
      refetch?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => ({
      giftCardMaxAmount: data?.data?.giftCardMaxAmount,
    }));
  }, [data, reset]);

  const showLoader = isLoading || isFetching;
  const apiCallInProgress =
    addLoyaltyProgramSettingsGeneralSettingsStatus.isLoading ||
    updateLoyaltyProgramSettingsGeneralSettingsStatus.isLoading;

  const moveToSettings = () => {
    router?.push(AIR_LOYALTY_PROGRAM?.SETTINGS);
  };

  return {
    methods,
    handleSubmit,
    submitGiftCard,
    apiCallInProgress,
    showLoader,
    isError,
    moveToSettings,
  };
};
