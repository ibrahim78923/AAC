import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  settingsValidationSchema,
  settingsDefaultValues,
} from './Settings.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useSettings = () => {
  const settingsMethods = useForm({
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: settingsDefaultValues,
  });

  const isSubmit = async () => {
    enqueueSnackbar('Settings Saved Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const timeOut = settingsMethods?.watch()?.sessionTimeout;
  const { handleSubmit, reset } = settingsMethods;
  const handleSubmitSettings = handleSubmit(isSubmit);

  return {
    settingsMethods,
    timeOut,
    reset,
    handleSubmitSettings,
  };
};
