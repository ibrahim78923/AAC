import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  upsertRolesDefaultValues,
  upsertRolesValidationSchema,
} from './UpsertRoles.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_SERVICES } from '@/constants';
import useAuth from '@/hooks/useAuth';
import {
  useGetPermissionsByProductQuery,
  usePostPermissionsRoleMutation,
} from '@/services/airServices/settings/user-management/roles';
import { useEffect } from 'react';

export default function useUpsertRoles() {
  const router: any = useRouter();
  const theme: any = useTheme();

  const { roleId } = router?.query;

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } = auth?.product?.accounts?.[0];
  const { _id: organizationId } = auth?.user?.organization;

  const {
    data: getPermissionsData,
    isLoading: getPermissionsIsLoading,
    isFetching: getPermissionsIsFetching,
    isError: getPermissionsIsError,
  } = useGetPermissionsByProductQuery({
    productId,
  });

  const methods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const getSlugs = () => {
    const slugs = getPermissionsData?.data?.flatMap(
      (parent: any) =>
        parent?.subModules?.flatMap(
          (subModule: any) =>
            subModule?.permissions?.map((item: any) => item?.slug),
        ),
    );
    const slugsObject = slugs?.reduce((acc: any, slug: any) => {
      acc[slug] = false;
      return acc;
    }, {});

    return slugsObject;
  };

  useEffect(() => {
    reset(upsertRolesDefaultValues(getSlugs()));
  }, [upsertRolesDefaultValues, reset, getPermissionsData?.data?.length]);

  const [postPermissionTrigger] = usePostPermissionsRoleMutation();

  const onSubmit = async (data: any) => {
    const permissionKeys = Object?.entries(data ?? {})
      ?.filter(
        ([key, value]) => key !== 'name' && key !== 'description' && value,
      )
      ?.map(([item]: any) => item);

    const updatedData = {
      organizationId,
      organizationCompanyAccountId,
      productId,
      status: 'ACTIVE',
      name: data?.name,
      description: data?.description,
      permissions: permissionKeys,
    };

    try {
      await postPermissionTrigger(updatedData)?.unwrap();
      successSnackbar(`Role ${roleId ? 'Updated' : 'Added'} Successfully!`);
      router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS);
    } catch (error) {
      errorSnackbar();
    }
  };

  return {
    router,
    roleId,
    methods,
    handleSubmit,
    onSubmit,
    theme,
    getPermissionsIsLoading,
    getPermissionsIsFetching,
    getPermissionsIsError,
    getPermissionsData,
  };
}
