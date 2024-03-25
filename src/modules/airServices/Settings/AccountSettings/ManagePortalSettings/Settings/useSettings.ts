import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import {
  getSettingsDataArray,
  settingsDefaultValues,
  settingsValidationSchema,
} from './Settings.data';

export const useSettings = () => {
  const domain = window.location.hostname;

  const auth: any = useAuth();

  const { _id: companyId } = auth?.product?.accounts?.[0]?.company;

  const encryptedValue = btoa(companyId);

  const settingsMethods = useForm({
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: settingsDefaultValues({ domain, encryptedValue }),
  });

  const { getValues }: any = settingsMethods;

  const handleTextFieldClick = () => {
    navigator.clipboard.writeText(getValues('portalURL'));
  };

  const settingsDataArray = getSettingsDataArray(handleTextFieldClick);

  return {
    settingsMethods,
    settingsDataArray,
  };
};
