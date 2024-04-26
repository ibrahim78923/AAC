import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addUserSchema } from '../RoleAndRights.data';

import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { enqueueSnackbar } from 'notistack';

import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ORG_ADMIN } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { getSession } from '@/utils';

const useAddRole = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const roleId = useSearchParams()?.get('id');
  const { user }: any = getSession();
  const { query } = navigate;
  const disabled = query?.type === 'view';
  const { useLazyGetPermissionsRolesByIdQuery, usePostPermissionRoleMutation } =
    rolesAndRightsAPI;
  const [postPermissionRole, { isLoading: loadingAddRole }] =
    usePostPermissionRoleMutation();

  const [trigger, { data: viewPerdetails }] =
    useLazyGetPermissionsRolesByIdQuery();

  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const roleDefaultValues: any = {
    productId: '',
    organizationCompanyAccountId: '',
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
      productId: query?.type !== 'add' ? data?.productDetails?.id : '',
      organizationCompanyAccountId:
        query?.type !== 'add' ? data?.companyAccountDetails?.id : '',
      name: query?.type !== 'add' ? data?.name : '',
      description: query?.type !== 'add' ? data?.description : '',
      status: query?.type !== 'add' ? data?.status : '',
      permissions: permissionsArray || [],
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  };

  useEffect(() => {
    trigger(query?.type !== 'add' && roleId);
  }, [roleId]);

  useEffect(() => {
    const data = viewPerdetails?.data;

    const permissionsArray =
      query?.type === 'view' || query?.type === 'edit'
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

  const { useGetProductsPermissionsQuery, useUpdateRoleRightsMutation } =
    rolesAndRightsAPI;

  const {
    data: productPermissionsData,
    isLoading: loadingProduct,
    refetch,
  } = useGetProductsPermissionsQuery({
    productId: productVal,
  });

  useEffect(() => {
    refetch();
  }, [productVal]);

  const [updateRoleRights, { isLoading: loadingUpdateRole }] =
    useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    values.status = values.status ? 'ACTIVE' : 'INACTIVE';
    try {
      if (query?.type === 'add') {
        values.organizationId = user?.organization?._id;
        await postPermissionRole({ body: values });
      } else {
        await updateRoleRights({ id: roleId, body: values });
      }
      navigate.push({
        pathname: ORG_ADMIN?.ROLES_AND_RIGHTS,
        query: { type: 'add' },
      });
      enqueueSnackbar(
        `${
          query?.type === 'add'
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
    viewPerdetails,
    setIsSwitchVal,
    handleSubmit,
    handleSwitch,
    isSwitchVal,
    productVal,
    loadingProduct,
    navigate,
    onSubmit,
    disabled,
    methods,
    theme,
    selectAllPermissions,
    getModulePermissions,
    loadingAddRole,
    loadingUpdateRole,
    refetch,
  };
};

export default useAddRole;
