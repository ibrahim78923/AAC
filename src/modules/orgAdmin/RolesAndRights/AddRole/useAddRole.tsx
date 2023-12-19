import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addUserSchema } from '../RoleAndRights.data';

import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';

const useAddRole = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const { query } = navigate;
  const { useGetPermissionsRolesByIdQuery } = rolesAndRightsAPI;

  const { data: viewPerdetails } = useGetPermissionsRolesByIdQuery(query?.id);

  const roleDefaultValues = {
    productDetails: viewPerdetails?.data?.productDetails?.id,
    companyAccountsDetails: viewPerdetails?.data?.companyAccountDetails?.id,
    name: viewPerdetails?.data?.name,
    description: viewPerdetails?.data?.description,
    defaultUser: viewPerdetails?.data?.status,
  };

  const methods: any = useForm<any>({
    resolver: yupResolver(addUserSchema),
    defaultValues: roleDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const productVal = watch('productDetails');

  const onSubmit = async () => {
    // console.log('values', data)
  };

  const handleSwitch = () => {
    setIsSwitchVal(!isSwitchVal);
  };

  const { useGetProductsPermissionsQuery } = rolesAndRightsAPI;
  const { data: productPermissionsData } = useGetProductsPermissionsQuery({
    productId: productVal,
  });

  return {
    isSwitchVal,
    setIsSwitchVal,
    navigate,
    onSubmit,
    handleSwitch,
    methods,
    theme,
    handleSubmit,
    productVal,
    productPermissionsData,
  };
};

export default useAddRole;
