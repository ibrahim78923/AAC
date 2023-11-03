import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserDefault, addUserSchema } from '../RoleAndRights.data';
import { useTheme } from '@mui/material';

const useRolesAndRights = () => {
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
    navigate,
    methods,
    onSubmit,
    handleSwitch,
    theme,
    isSwitchVal,
  };
};

export default useRolesAndRights;
