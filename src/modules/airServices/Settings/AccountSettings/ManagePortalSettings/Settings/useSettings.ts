import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import {
  getSettingsDataArray,
  settingsDefaultValues,
  settingsValidationSchema,
} from './Settings.data';
import { useGetCompanyAccountsByIdQuery } from '@/services/airServices/settings/account-settings/account-details';
import { useEffect } from 'react';

export const useSettings = () => {
  const domain = window.location.hostname;

  const auth: any = useAuth();

  const { _id: companyId } = auth?.product?.accounts?.[0]?.company;

  const encryptedValue = btoa(companyId);

  const { data, isLoading, isFetching } = useGetCompanyAccountsByIdQuery(
    companyId,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const apiKeyData = data?.data?.apiKey;

  const settingsMethods = useForm({
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: settingsDefaultValues({
      domain,
      encryptedValue,
      apiKeyData,
    }),
  });

  const { getValues, reset }: any = settingsMethods;

  useEffect(() => {
    reset(
      settingsDefaultValues({
        domain,
        encryptedValue,
        apiKeyData,
      }),
    );
  }, [data, reset, apiKeyData, domain, encryptedValue]);

  const handleTextFieldClick = () => {
    navigator.clipboard.writeText(getValues('portalURL'));
  };
  const handleApiKeyClick = () => {
    navigator.clipboard.writeText(getValues('apiKey'));
  };

  const settingsDataArray = getSettingsDataArray(
    handleTextFieldClick,
    handleApiKeyClick,
  );

  return {
    settingsMethods,
    settingsDataArray,
    isLoading,
    isFetching,
  };
};
