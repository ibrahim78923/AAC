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

  // To Post or patch the product
  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[0]?.company;
  const { _id: organizationId } = auth?.user?.organization;

  // get the accordion list permissions
  const {
    data: getPermissionsData,
    isLoading: getPermissionsIsLoading,
    isFetching: getPermissionsIsFetching,
    isError: getPermissionsIsError,
  } = useGetPermissionsByProductQuery({
    productId,
  });

  // form methods
  const methods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues(),
  });

  const { handleSubmit, reset } = methods;

  // reset the values of form with new slugs
  useEffect(() => {
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

    reset(upsertRolesDefaultValues(slugsObject));
  }, [reset, getPermissionsData]);

  // get by id roles
  const {
    data: getRolesData,
    isLoading: getRolesIsLoading,
    isFetching: getRolesIsFetching,
  } = useGetPermissionsRoleByIdQuery(roleId, {
    skip: !roleId,
  });

  useEffect(() => {
    if (roleId) {
      const { name, description, permissions } = getRolesData?.data;

      const slugs = permissions?.flatMap(
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

      reset(upsertRolesDefaultValues({ name, description, ...slugsObject }));
    }
  }, [reset, getRolesData]);

  // Submissions
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
    getPermissionsIsLoading,
    getPermissionsIsFetching,
    getPermissionsIsError,
    getPermissionsData,
    postPermissionsStatus,
    getRolesIsLoading,
    getRolesIsFetching,
    patchPermissionsStatus,
  };
}
