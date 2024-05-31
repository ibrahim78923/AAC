import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  upsertRolesAndRightDefaultValues,
  upsertRolesAndRightFormFieldsDynamic,
  upsertRolesAndRightValidationSchema,
} from './UpsertRolesAndRight.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetPermissionsRoleByIdForLoyaltyQuery,
  usePatchPermissionsRoleByIdForLoyaltyMutation,
  usePostPermissionsRoleForLoyaltyMutation,
} from '@/services/airLoyaltyProgram/roles-and-right';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { ARRAY_INDEX, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const useUpsertRolesAndRight = () => {
  const router = useRouter();
  const { roleId, action } = router?.query;
  const auth: any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;
  const methods = useForm<any>({
    defaultValues: upsertRolesAndRightDefaultValues(),
    resolver: yupResolver(upsertRolesAndRightValidationSchema),
  });

  const { handleSubmit, reset } = methods;

  const upsertRolesAndRightFormFields = upsertRolesAndRightFormFieldsDynamic();
  const {
    data: getRolesData,
    isLoading: getRolesIsLoading,
    isFetching: getRolesIsFetching,
    isError: getRolesIsError,
  } = useGetPermissionsRoleByIdForLoyaltyQuery(roleId, {
    skip: !roleId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const slugs = getRolesData?.data?.permissions?.flatMap((parent: any) =>
      parent?.subModules?.flatMap((subModule: any) =>
        subModule?.permissions?.map((item: any) => item?.slug),
      ),
    );

    const slugsObject = slugs?.reduce((acc: any, slug: any) => {
      acc[slug] = true;
      return acc;
    }, {});

    const name = getRolesData?.data?.name;
    const description = getRolesData?.data?.description;

    reset(
      upsertRolesAndRightDefaultValues({ name, description, ...slugsObject }),
    );
  }, [reset, getRolesData, roleId]);

  const [postPermissionTrigger, postPermissionsStatus] =
    usePostPermissionsRoleForLoyaltyMutation();

  const [patchPermissionTrigger, patchPermissionsStatus] =
    usePatchPermissionsRoleByIdForLoyaltyMutation();

  const submitButtonHandler = () => {
    if (action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW) {
      router?.push(AIR_LOYALTY_PROGRAM?.ROLES_AND_RIGHTS);
      return;
    }
    handleSubmit(submitUpsertRoles)();
  };

  const submitUpsertRoles = async (data: any) => {
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
      router?.push(AIR_LOYALTY_PROGRAM?.ROLES_AND_RIGHTS);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    router,
    roleId,
    methods,
    handleSubmit,
    reset,
    submitUpsertRoles,
    upsertRolesAndRightFormFields,
    action,
    postPermissionsStatus,
    getRolesIsLoading,
    getRolesIsFetching,
    patchPermissionsStatus,
    getRolesIsError,
    submitButtonHandler,
  };
};
