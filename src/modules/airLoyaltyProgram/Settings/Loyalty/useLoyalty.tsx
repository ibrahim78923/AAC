import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useAddLoyaltyProgramSettingsGeneralSettingsMutation,
  useGetLoyaltyProgramSettingsGeneralSettingsQuery,
  useUpdateLoyaltyProgramSettingsGeneralSettingsMutation,
} from '@/services/airLoyaltyProgram/settings';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useLoyalty = () => {
  const methods = useForm({
    defaultValues: {
      maxPointLimit: '',
      exchangeRate: '',
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
      refetch?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => ({
      maxPointLimit: data?.data?.maxPointLimit,
      exchangeRate: data?.data?.exchangeRate,
    }));
  }, [data, reset]);

  const showLoader = isLoading || isFetching;
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
  };
};
