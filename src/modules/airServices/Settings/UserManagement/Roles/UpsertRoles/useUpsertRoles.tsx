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
  useGetPermissionsRoleByIdQuery,
  usePatchPermissionsRoleByIdMutation,
  usePostPermissionsRoleMutation,
} from '@/services/airServices/settings/user-management/roles';
import { useEffect } from 'react';

export default function useUpsertRoles() {
  const router: any = useRouter();
  const theme: any = useTheme();

  const { roleId } = router?.query;

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[0]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  const methods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const {
    data: getRolesData,
    isLoading: getRolesIsLoading,
    isFetching: getRolesIsFetching,
    isError: getRolesIsError,
  } = useGetPermissionsRoleByIdQuery(roleId, {
    skip: !roleId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const slugs = getRolesData?.data?.permissions?.flatMap(
      (parent: any) =>
        parent?.subModules?.flatMap(
          (subModule: any) =>
            subModule?.permissions?.map((item: any) => item?.slug),
        ),
    );

    const slugsObject = slugs?.reduce((acc: any, slug: any) => {
      acc[slug] = true;
      return acc;
    }, {});

    const name = getRolesData?.data?.name;
    const description = getRolesData?.data?.description;

    reset(upsertRolesDefaultValues({ name, description, ...slugsObject }));
  }, [reset, getRolesData, roleId]);

  const [postPermissionTrigger, postPermissionsStatus] =
    usePostPermissionsRoleMutation();

  const [patchPermissionTrigger, patchPermissionsStatus] =
    usePatchPermissionsRoleByIdMutation();

  const onSubmit = async (data: any) => {
    const permissionKeys = Object?.entries(data ?? {})
      ?.filter(
        ([key, value]) => key !== 'name' && key !== 'description' && value,
      )
      ?.map(([item]: any) => item);

    const updatedPostData = {
      organizationId,
      organizationCompanyAccountId,
      productId,
      status: 'ACTIVE',
      name: data?.name,
      description: data?.description,
      permissions: permissionKeys,
    };

    const updatedPatchData = {
      companyAccountRoleId: organizationId,
      organizationCompanyAccountId,
      productId,
      status: 'ACTIVE',
      name: data?.name,
      description: data?.description,
      permissions: permissionKeys,
    };

    try {
      if (roleId) {
        await patchPermissionTrigger({ updatedPatchData, roleId })?.unwrap();
      } else {
        await postPermissionTrigger(updatedPostData)?.unwrap();
      }
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
    postPermissionsStatus,
    getRolesIsLoading,
    getRolesIsFetching,
    patchPermissionsStatus,
    getRolesIsError,
  };
}
