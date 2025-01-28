import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useAddLoyaltyProgramSettingsGeneralSettingsMutation,
  useUpdateLoyaltyProgramSettingsGeneralSettingsMutation,
} from '@/services/airLoyaltyProgram/settings';
import { useEffect } from 'react';
import { useGetLoyaltySettings } from '../SettingsHooks/useGetLoyaltySettings';
import { useFormLib } from '@/hooks/useFormLib';
import { loyaltySettingsFormDefaultValues } from './Loyalty.data';

export const useLoyalty = () => {
  const formLibProps = {
    defaultValues: loyaltySettingsFormDefaultValues(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const {
    getLoyaltySettings,
    lazyGetLoyaltyProgramSettingsGeneralSettingsStatus,
    addLoyaltyProgramSettingsGeneralSettingsFirstTimeStatus,
  } = useGetLoyaltySettings();

  const { data, isLoading, isFetching, isError } =
    lazyGetLoyaltyProgramSettingsGeneralSettingsStatus;

  const [
    addLoyaltyProgramSettingsGeneralSettingsTrigger,
    addLoyaltyProgramSettingsGeneralSettingsStatus,
  ] = useAddLoyaltyProgramSettingsGeneralSettingsMutation();

  const [
    updateLoyaltyProgramSettingsGeneralSettingsTrigger,
    updateLoyaltyProgramSettingsGeneralSettingsStatus,
  ] = useUpdateLoyaltyProgramSettingsGeneralSettingsMutation();

  const submitLoyalty = async (formData: any) => {
    const body = {
      maxPointLimit: formData?.maxPointLimit,
      exchangeRate: formData?.exchangeRate,
    };

    const apiDataParameter = {
      body,
    };
    if (data?.data?._id) {
      await updateLoyalty(body);
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

  useEffect(() => {
    getLoyaltySettings?.();
  }, []);

  const updateLoyalty = async (formData: any) => {
    const body = {
      maxPointLimit: formData?.maxPointLimit,
      exchangeRate: formData?.exchangeRate,
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
      getLoyaltySettings?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => loyaltySettingsFormDefaultValues(data?.data));
  }, [data, reset]);

  const showLoader =
    isLoading ||
    isFetching ||
    addLoyaltyProgramSettingsGeneralSettingsFirstTimeStatus.isLoading;

  const apiCallInProgress =
    addLoyaltyProgramSettingsGeneralSettingsStatus.isLoading ||
    updateLoyaltyProgramSettingsGeneralSettingsStatus.isLoading;

  return {
    methods,
    handleSubmit,
    submitLoyalty,
    apiCallInProgress,
    showLoader,
    isError,
    reset,
    getLoyaltySettings,
  };
};
