import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addUserDefault, addUserSchema } from '../RoleAndRights.data';

const useAddRole = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isSwitchVal, setIsSwitchVal] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues: addUserDefault,
  });

  const onSubmit = async (data: any) => {
    alert(data);
  };

  const handleSwitch = () => {
    setIsSwitchVal(!isSwitchVal);
  };

  return {
    isSwitchVal,
    setIsSwitchVal,
    navigate,
    onSubmit,
    handleSwitch,
    methods,
    theme,
  };
};

export default useAddRole;
