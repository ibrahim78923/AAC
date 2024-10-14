import { useForm } from 'react-hook-form';
import {
  upsertRolesAndRightDefaultValues,
  upsertRolesAndRightFormFieldsDynamic,
  upsertRolesAndRightValidationSchema,
} from './UpsertRolesAndRight.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useUpdateLoyaltyProgramRoleAndRightsSinglePermissionsRoleMutation,
  useAddLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation,
  useGetLoyaltyProgramRoleAndRightsSinglePermissionRoleByIdQuery,
} from '@/services/airLoyaltyProgram/roles-and-right';
import { useEffect, useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ARRAY_INDEX } from '@/constants/strings';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedRoleAndRightsLists,
  setIsPortalClose,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';
import { getActiveAccountSession } from '@/utils';
import { ROLE_AND_RIGHTS_STATUS } from '@/constants/api';

export const useUpsertRolesAndRight = () => {
  const auth: any = useAuth();
  const activeAccount = useMemo(() => getActiveAccountSession(), []);

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.isPortalOpen,
  );

  const selectedRoleAndRightsLists = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.selectedRoleAndRightsLists,
  );

  const roleId =
    isPortalOpen?.action !==
    LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS
      ? selectedRoleAndRightsLists?.[ARRAY_INDEX?.ZERO]?._id
      : undefined;

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
  } = useGetLoyaltyProgramRoleAndRightsSinglePermissionRoleByIdQuery(roleId, {
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

    reset(
      upsertRolesAndRightDefaultValues({ name, description, ...slugsObject }),
    );
  }, [reset, getRolesData, roleId]);

  const [
    addLoyaltyProgramRoleAndRightsSinglePermissionRoleTrigger,
    addLoyaltyProgramRoleAndRightsSinglePermissionRoleStatus,
  ] = useAddLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation();

  const [
    updateLoyaltyProgramRoleAndRightsSinglePermissionsRoleTrigger,
    updateLoyaltyProgramRoleAndRightsSinglePermissionsRoleStatus,
  ] = useUpdateLoyaltyProgramRoleAndRightsSinglePermissionsRoleMutation();

  const closePortal = () => {
    dispatch(emptySelectedRoleAndRightsLists());
    dispatch(setIsPortalClose());
  };

  const submitButtonHandler = () => {
    if (
      isPortalOpen?.action ===
      LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL
    ) {
      closePortal?.();
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

    const productId = auth?.product?._id ?? {};
    const organizationId = auth?.user?.organization?._id ?? {};
    const organizationCompanyAccountId = activeAccount?.company?._id ?? {};

    const body = {
      organizationId,
      organizationCompanyAccountId,
      productId,
      status: ROLE_AND_RIGHTS_STATUS?.ACTIVE,
      name: data?.name,
      ...(!!data?.description ? { description: data?.description } : {}),
      permissions: permissionKeys,
    };

    if (roleId) {
      submitUpdateRole(body);
      return;
    }

    const apiDataParameter = {
      body,
    };
    try {
      await addLoyaltyProgramRoleAndRightsSinglePermissionRoleTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar(`Role added successfully!`);
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateRole = async (data: any) => {
    const body = {
      companyAccountRoleId: data?.organizationId,
      organizationCompanyAccountId: data?.organizationCompanyAccountId,
      productId: data?.productId,
      status: ROLE_AND_RIGHTS_STATUS?.ACTIVE,
      name: data?.name,
      ...(!!data?.description ? { description: data?.description } : {}),
      permissions: data?.permissions,
    };

    const apiDataParameter = {
      body,
      pathParams: {
        roleId,
      },
    };
    try {
      await updateLoyaltyProgramRoleAndRightsSinglePermissionsRoleTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar(`Role updated successfully!`);
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress =
    addLoyaltyProgramRoleAndRightsSinglePermissionRoleStatus?.isLoading ||
    updateLoyaltyProgramRoleAndRightsSinglePermissionsRoleStatus?.isLoading;

  const permissionAccordionsProps = {
    reset,
    methods,
  };

  return {
    methods,
    handleSubmit,
    submitUpsertRoles,
    upsertRolesAndRightFormFields,
    getRolesIsLoading,
    getRolesIsFetching,
    getRolesIsError,
    submitButtonHandler,
    isPortalOpen,
    closePortal,
    apiCallInProgress,
    permissionAccordionsProps,
  };
};
