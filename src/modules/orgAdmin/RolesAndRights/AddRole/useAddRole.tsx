import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addUserDefault, addUserSchema } from '../RoleAndRights.data';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';

const useAddRole = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues: addUserDefault,
  });

  const { handleSubmit, watch } = methods;
  const productVal = watch('productType');

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
