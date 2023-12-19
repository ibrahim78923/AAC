import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addUserSchema } from '../RoleAndRights.data';

import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';
import { enqueueSnackbar } from 'notistack';

import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ORG_ADMIN } from '@/constants';

const useAddRole = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const { query }: any = navigate;

  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const viewPerdetails = query?.type !== 'add' && JSON?.parse(query?.data);

  // getting form values from querydata
  const roleDefaultValues: any = {
    productId: viewPerdetails?.data?.productDetails?.id,
    companyAccountRoleId: viewPerdetails?.data?.companyAccountDetails?.id,
    name: viewPerdetails?.data?.name,
    description: viewPerdetails?.data?.description,
    status: viewPerdetails?.data?.status,
  };

  const methods: any = useForm<any>({
    resolver: yupResolver(addUserSchema),
    defaultValues: roleDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const productVal = watch('productId');

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
    updateRoleRights({ id: viewPerdetails?.data?._id, body: values });
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
