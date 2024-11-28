import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserSchema } from '../RoleAndRights.data';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { ORG_ADMIN } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { getSession } from '@/utils';
import { ROLE_AND_RIGHTS_STATUS } from '@/constants/api';

const useAddRole = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const roleId = useSearchParams()?.get('id');
  const { user }: any = getSession();
  const { query } = navigate;
  const disabled = query?.type === DRAWER_TYPES?.VIEW;

  const {
    useLazyGetPermissionsRolesByIdOrgadminQuery,
    usePostPermissionRoleOrgadminMutation,
    useGetProductsPermissionsOrgadminQuery,
    useUpdateRoleRightsOrgadminMutation,
  } = rolesAndRightsAPI;

  const [postPermissionRole, { isLoading: loadingAddRole }] =
    usePostPermissionRoleOrgadminMutation();

  const [trigger, { data: viewPerdetails }] =
    useLazyGetPermissionsRolesByIdOrgadminQuery();

  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const roleDefaultValues: any = {
    productId: null,
    organizationCompanyAccountId: [],
    name: '',
    description: '',
    status: '',
    permissions: [],
  };

  const methods: any = useForm<any>({
    resolver: yupResolver(addUserSchema),
    defaultValues: roleDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;
  const productVal = watch('productId');

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
      productId:
        query?.type !== DRAWER_TYPES?.ADD
          ? data
            ? {
                _id: data?.productDetails?.id,
                name: data?.productDetails?.name,
              }
            : null
          : null,
      organizationCompanyAccountId:
        query?.type !== DRAWER_TYPES?.ADD
          ? [
              {
                _id: data?.companyAccountDetails?.id,
                accountName: data?.companyAccountDetails?.name,
              },
            ]
          : [],
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

  const handleSwitch = () => {
    setIsSwitchVal(!isSwitchVal);
  };

  const { data: productPermissionsData, isLoading: loadingProduct } =
    useGetProductsPermissionsOrgadminQuery(
      {
        productId: productVal?._id,
      },
      { skip: !productVal?._id },
    );

  const [updateRoleRights, { isLoading: loadingUpdateRole }] =
    useUpdateRoleRightsOrgadminMutation();

  const onSubmit = async (values: any) => {
    values.status = ROLE_AND_RIGHTS_STATUS?.ACTIVE;
    values.productId = values?.productId?._id;
    values.organizationCompanyAccountId =
      values?.organizationCompanyAccountId?.map((item: any) => {
        return item?._id;
      });
    // values.organizationCompanyAccountId =
    //   values?.organizationCompanyAccountId?._id;
    try {
      if (query?.type === DRAWER_TYPES?.ADD) {
        values.organizationId = user?.organization?._id;
        await postPermissionRole({ body: values });
      } else {
        await updateRoleRights({ id: roleId, body: values });
      }
      navigate.push({
        pathname: ORG_ADMIN?.ROLES_AND_RIGHTS,
        query: { type: DRAWER_TYPES?.ADD },
      });
      enqueueSnackbar(
        `${
          query?.type === DRAWER_TYPES?.ADD
            ? `Role has been Added successfully`
            : `Information Updated successfully`
        }`,
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
    productPermissionsData,
    selectAllPermissions,
    getModulePermissions,
    loadingUpdateRole,
    viewPerdetails,
    setIsSwitchVal,
    loadingProduct,
    loadingAddRole,
    handleSubmit,
    handleSwitch,
    isSwitchVal,
    productVal,
    navigate,
    onSubmit,
    disabled,
    // refetch,
    methods,
    theme,
  };
};

export default useAddRole;
