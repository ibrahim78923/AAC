import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  customizePortalDefaultValues,
  DefaultValuesKeys,
  getCustomizationsDataArray,
} from './CustomizePortal.data';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useGetCustomerPortalPermissionsQuery,
  usePatchCustomerPortalStylingsMutation,
} from '@/services/airServices/settings/account-settings/customer-portal-settings';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useCustomizePortal() {
  const theme: Theme = useTheme();
  const auth: any = useAuth();

  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;

  const apiDataParameter = {
    pathParams: {
      id: organizationCompanyAccountId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalPermissionsQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!organizationCompanyAccountId,
    });

  const methods = useForm({
    defaultValues: customizePortalDefaultValues(
      theme,
      data?.data?.customerPortalStyling,
    ),
  });
  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    if (data?.data?.customerPortalStyling) {
      reset(
        customizePortalDefaultValues(theme, data?.data?.customerPortalStyling),
      );
    }
  }, [data, reset, theme]);

  const resetHandler = useCallback(
    (fieldName: DefaultValuesKeys) => {
      const defaultValues = customizePortalDefaultValues(theme);
      reset((currentValues) => ({
        ...currentValues,
        [fieldName]: defaultValues[fieldName],
      }));
    },
    [reset, theme],
  );

  const customizationsDataArray = useMemo(
    () => getCustomizationsDataArray(resetHandler),
    [resetHandler],
  );

  const [
    patchCustomerPortalStylingsTrigger,
    patchCustomerPortalStylingsStatus,
  ] = usePatchCustomerPortalStylingsMutation();

  const onSubmit = async (data: any) => {
    if (!organizationCompanyAccountId) return;

    const formData = new FormData();
    formData?.append('id', organizationCompanyAccountId);

    if (data?.image instanceof File) {
      formData?.append('image', data?.image);
    }

    formData.append(
      'customerPortalStyling',
      JSON.stringify({
        btnPrimary: data?.btnPrimary,
        btnSecondary: data?.btnSecondary,
        iconPrimary: data?.iconPrimary,
        iconSecondary: data?.iconSecondary,
        sideMenu: data?.sideMenu,
      }),
    );

    try {
      await patchCustomerPortalStylingsTrigger({ body: formData })?.unwrap();
      successSnackbar('Portal Customized Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    watch,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    customizationsDataArray,
    isLoading,
    isFetching,
    isError,
    refetch,
    patchCustomerPortalStylingsStatus,
  };
}
