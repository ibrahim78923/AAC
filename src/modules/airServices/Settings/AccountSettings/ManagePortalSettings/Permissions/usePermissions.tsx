import {
  useGetServicesAccountDetailsCustomerPortalPermissionsQuery,
  usePatchServicesAccountDetailsCustomerPortalPermissionsMutation,
} from '@/services/airServices/settings/account-settings/customer-portal-settings';
import {
  customerPortalSettingsFormDefaultValues,
  customerPortalSettingsSchemaValidation,
} from './Permissions.data';
import { useEffect, useMemo } from 'react';
import { getActiveAccountSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';
import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';

export const usePermissions = () => {
  const router = useRouter();
  const [
    patchCustomerPortalPermissionsTrigger,
    patchCustomerPortalPermissionsStatus,
  ] = usePatchServicesAccountDetailsCustomerPortalPermissionsMutation?.();

  const permissionsMethodProps = {
    validationSchema: customerPortalSettingsSchemaValidation,
    defaultValues: customerPortalSettingsFormDefaultValues?.(),
  };
  const { handleSubmit, reset, methods } = useFormLib(permissionsMethodProps);

  const product = useMemo(() => getActiveAccountSession(), []);
  const organizationCompanyAccountId = product?.company?._id;

  const apiDataParameter = {
    pathParams: {
      id: organizationCompanyAccountId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesAccountDetailsCustomerPortalPermissionsQuery(
      apiDataParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!organizationCompanyAccountId,
      },
    );

  useEffect(() => {
    reset(() =>
      customerPortalSettingsFormDefaultValues(
        data?.data?.customerPortalPermissions,
      ),
    );
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    const permissionsArray = Object?.keys(formData ?? {})?.filter((key) => {
      const value = formData?.[key];
      return value === 'true' || value === true;
    });

    const body = {
      customerPortalPermissions: permissionsArray,
      id: organizationCompanyAccountId,
    };

    const apiDataParameter = { body };
    try {
      await patchCustomerPortalPermissionsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Permissions updated successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const showLoader = isLoading || isFetching;
  const handleCancelButton = () => router?.push(AIR_SERVICES?.ACCOUNT_SETTINGS);

  return {
    methods,
    handleSubmit,
    onSubmit,
    patchCustomerPortalPermissionsStatus,
    showLoader,
    isError,
    refetch,
    handleCancelButton,
  };
};
