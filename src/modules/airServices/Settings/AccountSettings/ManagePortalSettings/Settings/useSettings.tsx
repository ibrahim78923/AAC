import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import {
  getSettingsDataArray,
  settingsDefaultValues,
  settingsValidationSchema,
} from './Settings.data';
import { useGetCompanyAccountsByIdQuery } from '@/services/airServices/settings/account-settings/account-details';
import { useEffect } from 'react';
import { ARRAY_INDEX } from '@/constants/strings';
import { IAuth, ISettingsDefaultValues } from './Settings.interface';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const useSettings = () => {
  const domain = window?.location?.hostname;

  const auth: IAuth = useAuth();

  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;

  const encryptedValue = btoa(companyId);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCompanyAccountsByIdQuery(companyId, {
      refetchOnMountOrArgChange: true,
    });
  const apiKeyData = data?.data?.apiKey;

  const settingsMethods: UseFormReturn<ISettingsDefaultValues> | any =
    useForm<ISettingsDefaultValues>({
      resolver: yupResolver(settingsValidationSchema),
      defaultValues: settingsDefaultValues({
        domain,
        encryptedValue,
        apiKeyData,
      }),
    });

  const { getValues, reset } = settingsMethods;

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
    navigator?.clipboard?.writeText(getValues('portalURL'));
  };
  const handleApiKeyClick = () => {
    navigator?.clipboard?.writeText(getValues('apiKey'));
  };

  const settingsDataArray = getSettingsDataArray(
    handleTextFieldClick,
    handleApiKeyClick,
  );

  const checkApiErrorOrLoading = () => {
    if (isLoading || isFetching) return <SkeletonForm />;
    if (isError) return <ApiErrorState canRefresh refresh={refetch} />;
    return undefined;
  };

  return {
    settingsMethods,
    settingsDataArray,
    isLoading,
    isFetching,
    checkApiErrorOrLoading,
  };
};
