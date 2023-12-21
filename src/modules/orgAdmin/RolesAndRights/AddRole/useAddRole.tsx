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
  const roleId = useSearchParams().get('id');
  const { user } = getSession();

  const { query } = navigate;

  const { useLazyGetPermissionsRolesByIdQuery, usePostPermissionRoleMutation } =
    rolesAndRightsAPI;
  const [postPermissionRole] = usePostPermissionRoleMutation();

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

  useEffect(() => {
    trigger(roleId);
  }, [roleId]);

  useEffect(() => {
    const data = viewPerdetails?.data;
    const fieldsToSet: any = {
      productId: data?.productDetails?.id,
      organizationCompanyAccountId: data?.companyAccountDetails?.id,
      name: data?.name,
      description: data?.description,
      status: data?.status,
      permissions: data?.permissions?.map((item: any) => item?.slug),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewPerdetails]);

  const handleSwitch = () => {
    setIsSwitchVal(!isSwitchVal);
  };

  const { useGetProductsPermissionsQuery, useUpdateRoleRightsMutation } =
    rolesAndRightsAPI;

  const { data: productPermissionsData } = useGetProductsPermissionsQuery({
    productId: productVal,
  });

  const [updateRoleRights] = useUpdateRoleRightsMutation();

  const onSubmit = async (values: any) => {
    values.status = values.status ? 'ACTIVE' : 'INACTIVE';

    if (query?.type === 'add') {
      values.organizationId = user?.organization?._id;
      postPermissionRole({ body: values });
    } else {
      updateRoleRights({ id: roleId, body: values });
    }

    navigate.push({
      pathname: ORG_ADMIN?.ROLES_AND_RIGHTS,
      query: { type: 'add' },
    });

    enqueueSnackbar(
      `${
        query?.type === 'add'
          ? `Information Updated successfully`
          : `Role has been added successfully`
      }`,
      {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      },
    );
  };

  return {
    productPermissionsData,
    setIsSwitchVal,
    handleSubmit,
    handleSwitch,
    isSwitchVal,
    productVal,
    navigate,
    onSubmit,
    methods,
    theme,
  };
};

export default useAddRole;
