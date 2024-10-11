import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserSchema } from '../RoleAndRights.data';
import { useTheme } from '@mui/material';
import {
  useLazyGetPermissionsRolesByIdOrgadminQuery,
  usePostPermissionRoleOrgadminMutation,
  useUpdateRoleRightsOrgadminMutation,
} from '@/services/orgAdmin/roles-and-rights';
import { enqueueSnackbar } from 'notistack';
import {
  DRAWER_TYPES,
  NOTISTACK_VARIANTS,
  PRODUCT_USER_STATUS,
} from '@/constants/strings';
import { useGetAdminProductsPermissionsByIdQuery } from '@/services/superAdmin/user-management/roles-and-rights';
import { SUPER_ADMIN } from '@/constants';

const useRolesAndRights = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const { query } = navigate;

  const disabled = query?.type === DRAWER_TYPES?.VIEW;
  const superAdminProductId = process?.env?.NEXT_PUBLIC_SUPER_ADMIN_PRODUCT_ID;
  const roleId = query?.id;

  const [postPermissionRole, { isLoading: addRoleLoading }] =
    usePostPermissionRoleOrgadminMutation();

  const [updateRoleRights, { isLoading: updateRoleLoading }] =
    useUpdateRoleRightsOrgadminMutation();

  const { data: productPermissionsData, isLoading: productPermissionsLoading } =
    useGetAdminProductsPermissionsByIdQuery(
      { productId: superAdminProductId },
      { skip: !superAdminProductId },
    );

  const [trigger, { data: viewPerdetails, isLoading: loadingRoleDetails }] =
    useLazyGetPermissionsRolesByIdOrgadminQuery();

  const roleDefaultValues: any = {
    name: '',
    description: '',
    status: '',
    permissions: [],
  };

  const methods: any = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues: roleDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const getModulePermissions = (subModules: any) => {
    return subModules?.flatMap((firstItem: any) => {
      return firstItem?.permissions?.map((item: any) => item?.slug);
    });
  };

  const selectAllPermissions = (subModules: any) => {
    let permissionsArray = [];
    const modulePermissions = getModulePermissions(subModules);
    if (
      !modulePermissions?.every(
        (permission: any) => watch('permissions')?.includes(permission),
      )
    ) {
      permissionsArray = modulePermissions?.concat(watch('permissions'));
    } else {
      permissionsArray = watch('permissions')?.filter(
        (permission: any) => !modulePermissions?.includes(permission),
      );
    }
    setValue('permissions', permissionsArray);
  };

  const setPayload = (permissionsArray: any) => {
    const data = viewPerdetails?.data;
    const fieldsToSet: any = {
      name: query?.type !== DRAWER_TYPES?.ADD ? data?.name : '',
      description: query?.type !== DRAWER_TYPES?.ADD ? data?.description : '',
      status: query?.type !== DRAWER_TYPES?.ADD ? data?.status : '',
      permissions: permissionsArray || [],
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  };

  useEffect(() => {
    if (query?.type !== DRAWER_TYPES?.ADD && roleId) {
      trigger(roleId);
    }
  }, [roleId]);

  useEffect(() => {
    const data = viewPerdetails?.data;

    const permissionsArray =
      query?.type === DRAWER_TYPES?.VIEW || query?.type === DRAWER_TYPES?.EDIT
        ? data?.permissions?.flatMap(
            (item: any) =>
              item?.subModules?.flatMap(
                (mod: any) => mod?.permissions?.map((slg: any) => slg?.slug),
              ),
          )
        : [];
    setPayload(permissionsArray);
  }, [viewPerdetails]);

  const onSubmit = async (values: any) => {
    values.productId = superAdminProductId;
    values.status = values.status
      ? PRODUCT_USER_STATUS?.ACTIVE
      : PRODUCT_USER_STATUS?.INACTIVE;
    try {
      if (query?.type === DRAWER_TYPES?.ADD) {
        await postPermissionRole({ body: values })?.unwrap();
      } else {
        await updateRoleRights({ id: roleId, body: values })?.unwrap();
      }
      navigate?.push({
        pathname: SUPER_ADMIN?.USERMANAGMENT,
        query: { type: DRAWER_TYPES?.ADD },
      });
      enqueueSnackbar(
        `Role has been ${
          query?.type === DRAWER_TYPES?.ADD ? 'Added' : 'Updated'
        } successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    productPermissionsLoading,
    productPermissionsData,
    selectAllPermissions,
    getModulePermissions,
    loadingRoleDetails,
    updateRoleLoading,
    addRoleLoading,
    viewPerdetails,
    handleSubmit,
    navigate,
    disabled,
    onSubmit,
    methods,
    theme,
    query,
    watch,
  };
};

export default useRolesAndRights;
