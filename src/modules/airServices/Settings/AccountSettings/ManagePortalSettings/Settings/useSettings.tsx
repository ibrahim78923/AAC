import {
  getSettingsDataArray,
  settingsDefaultValues,
  settingsValidationSchema,
} from './Settings.data';
import { useEffect, useMemo } from 'react';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { getActiveAccountSession } from '@/utils';
import { useGetServiceAccountDetailCompanyAccountsByIdQuery } from '@/services/airServices/settings/account-settings/account-details';
import { useFormLib } from '@/hooks/useFormLib';

export const useSettings = () => {
  const domain = window?.location?.hostname;

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id;

  const encryptedValue = btoa(companyId);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServiceAccountDetailCompanyAccountsByIdQuery(companyId, {
      refetchOnMountOrArgChange: true,
    });
  const apiKeyData = data?.data?.apiKey;

  const settingsMethodProps = {
    validationSchema: settingsValidationSchema,
    defaultValues: settingsDefaultValues({
      domain,
      encryptedValue,
      apiKeyData,
    }),
  };

  const { getValues, reset, methods } = useFormLib(settingsMethodProps);

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
    methods,
    settingsDataArray,
    isLoading,
    isFetching,
    checkApiErrorOrLoading,
  };
};
