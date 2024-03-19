import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  settingsValidationSchema,
  settingsDefaultValues,
} from './Settings.data';

export const useSettings = () => {
  const settingsMethods = useForm({
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: settingsDefaultValues,
  });

  return {
    settingsMethods,
  };
};
