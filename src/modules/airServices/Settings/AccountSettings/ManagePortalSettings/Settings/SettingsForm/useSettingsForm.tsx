import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  settingsFormValidationSchema,
  settingsFormDefaultValues,
} from './SettingsForm.data';

export const useSettingsForm = () => {
  const methods: any = useForm<any>({
    resolver: yupResolver(settingsFormValidationSchema),
    defaultValues: settingsFormDefaultValues(),
  });
  const { handleSubmit, reset } = methods;

  const isSubmit = async () => {
    enqueueSnackbar('Success', {
      variant: 'success',
    });
    reset(settingsFormDefaultValues());
  };

  return {
    methods,
    handleSubmit,
    isSubmit,
  };
};
