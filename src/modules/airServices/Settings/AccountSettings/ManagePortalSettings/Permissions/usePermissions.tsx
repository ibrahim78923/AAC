import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import {
  useGetCustomerPortalPermissionsQuery,
  usePatchCustomerPortalPermissionsMutation,
} from '@/services/airServices/settings/account-settings/customer-portal-settings';
import {
  customerPortalSettingsFormDefaultValues,
  customerPortalSettingsSchemaValidation,
} from './Permissions.data';
import { useEffect } from 'react';
import { errorSnackbar } from '@/utils/api';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const usePermissions = () => {
  const [
    patchCustomerPortalPermissionsTrigger,
    patchCustomerPortalPermissionsStatus,
  ] = usePatchCustomerPortalPermissionsMutation?.();

  const methods = useForm({
    resolver: yupResolver(customerPortalSettingsSchemaValidation),
    defaultValues: customerPortalSettingsFormDefaultValues?.(),
  });
  const { handleSubmit, reset } = methods;

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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const checkApiErrorOrLoading = () => {
    if (isLoading || isFetching) return <SkeletonTable />;
    if (isError) return <ApiErrorState canRefresh refresh={refetch} />;
    return undefined;
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    checkApiErrorOrLoading,
    patchCustomerPortalPermissionsStatus,
  };
};
