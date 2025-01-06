import { Theme, useTheme } from '@mui/material';
import {
  customizePortalDefaultValues,
  DefaultValuesKeys,
  getCustomizationsDataArray,
} from './CustomizePortal.data';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useGetServicesAccountDetailsCustomerPortalPermissionsQuery,
  usePatchServicesAccountDetailsCustomerPortalStylingsMutation,
} from '@/services/airServices/settings/account-settings/customer-portal-settings';
import { getActiveAccountSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useCustomizePortal = () => {
  const theme: Theme = useTheme();

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

  const customizePortalMethodProps = {
    defaultValues: customizePortalDefaultValues(
      theme,
      data?.data?.customerPortalStyling,
    ),
  };
  const { handleSubmit, reset, watch, methods } = useFormLib(
    customizePortalMethodProps,
  );

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
      reset((currentValues: any) => ({
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
  ] = usePatchServicesAccountDetailsCustomerPortalStylingsMutation();

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
};

export default useCustomizePortal;
