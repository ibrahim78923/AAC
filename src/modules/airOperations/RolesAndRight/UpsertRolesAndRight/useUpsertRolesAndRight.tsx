import { useRouter } from 'next/router';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  upsertRolesAndRightDefaultValues,
  upsertRolesAndRightFormFieldsDynamic,
  upsertRolesAndRightValidationSchema,
} from './UpsertRolesAndRight.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_OPERATIONS } from '@/constants';
import { ARRAY_INDEX, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import {
  useGetPermissionsRoleByIdForOperationsQuery,
  usePatchPermissionsRoleByIdForOperationsMutation,
  usePostPermissionsRoleForOperationsMutation,
} from '@/services/airOperations/roles-and-right';
import {
  IAuth,
  IPermissionParent,
  IPermissionSubModule,
  IPermissionItem,
  IUpsertRolesAndRightFormData,
} from './UpsertRolesAndRight.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useUpsertRolesAndRight = () => {
  const router = useRouter();
  const { roleId, action } = router?.query;
  const auth: IAuth | any = useAuth();

  const { _id: productId } = auth?.product;
  const { _id: organizationCompanyAccountId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: organizationId } = auth?.user?.organization;
  const methods: UseFormReturn<IUpsertRolesAndRightFormData> =
    useForm<IUpsertRolesAndRightFormData>({
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
  } = useGetPermissionsRoleByIdForOperationsQuery(roleId, {
    skip: !roleId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const slugs = getRolesData?.data?.permissions?.flatMap(
      (parent: IPermissionParent) =>
        parent?.subModules?.flatMap(
          (subModule: IPermissionSubModule) =>
            subModule?.permissions?.map((item: IPermissionItem) => item?.slug),
        ),
    );

    const slugsObject = slugs?.reduce(
      (acc: Record<string, boolean>, slug: string | any) => {
        acc[slug] = true;
        return acc;
      },
      {},
    );

    const name = getRolesData?.data?.name;
    const description = getRolesData?.data?.description;

    reset(
      upsertRolesAndRightDefaultValues({ name, description, ...slugsObject }),
    );
  }, [reset, getRolesData, roleId]);

  const [postPermissionTrigger, postPermissionsStatus] =
    usePostPermissionsRoleForOperationsMutation();

  const [patchPermissionTrigger, patchPermissionsStatus] =
    usePatchPermissionsRoleByIdForOperationsMutation();

  const submitButtonHandler = () => {
    if (action === GENERIC_UPSERT_FORM_CONSTANT?.VIEW) {
      router?.push(AIR_OPERATIONS?.ROLES_AND_RIGHTS);
      return;
    }
    handleSubmit(submitUpsertRoles)();
  };

  const submitUpsertRoles = async (data: IUpsertRolesAndRightFormData) => {
    const permissionKeys = Object?.entries(data ?? {})
      ?.filter(
        ([key, value]) => key !== 'name' && key !== 'description' && value,
      )
      ?.map(([item]: string | any) => item);

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
      router?.push(AIR_OPERATIONS?.ROLES_AND_RIGHTS);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const permissionAccordionsProps = {
    reset,
    methods,
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
    permissionAccordionsProps,
  };
};
