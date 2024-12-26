import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  upsertRolesDefaultValues,
  upsertRolesValidationSchema,
} from './UpsertRoles.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_SERVICES } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import {
  useGetPermissionsRoleByIdQuery,
  usePatchPermissionsRoleByIdMutation,
  usePostPermissionsRoleMutation,
} from '@/services/airServices/settings/user-management/roles';
import { useEffect, useMemo } from 'react';
import { getActiveAccountSession } from '@/utils';
import { useFormLib } from '@/hooks/useFormLib';

export default function useUpsertRoles() {
  const router: any = useRouter();
  const theme: any = useTheme();
  const activeAccount = useMemo(() => getActiveAccountSession(), []);
  const { roleId } = router?.query;

  const auth: any = useAuth();

  const upsertRolesMethodProps = {
    validationSchema: upsertRolesValidationSchema,
    defaultValues: upsertRolesDefaultValues(),
  };

  const { handleSubmit, reset, setValue, methods } = useFormLib(
    upsertRolesMethodProps,
  );

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

    const productId = auth?.product?._id ?? {};
    const organizationId = auth?.user?.organization?._id ?? {};
    const organizationCompanyAccountId = activeAccount?.company?._id ?? {};

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

  const permissionAccordionsProps = {
    reset,
    setValue,
    methods,
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
    reset,
    permissionAccordionsProps,
  };
}
