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

const useAddRole = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const roleId = useSearchParams().get('id');

  const { useLazyGetPermissionsRolesByIdQuery } = rolesAndRightsAPI;

  const [trigger, { data: viewPerdetails }] =
    useLazyGetPermissionsRolesByIdQuery();

  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const roleDefaultValues: any = {
    productId: '',
    companyAccountRoleId: '',
    name: '',
    description: '',
    status: '',
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
      companyAccountRoleId: data?.companyAccountDetails?.id,
      name: data?.name,
      description: data?.description,
      status: data?.status,
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
    updateRoleRights({ id: roleId, body: values });
    navigate.push({
      pathname: ORG_ADMIN?.ROLES_AND_RIGHTS,
      query: { type: 'add' },
    });
    enqueueSnackbar('User updated successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
