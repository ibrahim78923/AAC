import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserData,
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';

export const useUpsertUser = (setIsDrawerOpen: any) => {
  const [userData, setUserData] = useState<any[]>(upsertUserData);
  const [disabled, setDisabled] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const submit = async () => {
    if (disabled) {
      setDisabled(false);
    } else {
      enqueueSnackbar('Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDrawerOpen(false);
      reset();
    }
  };

  return {
    methods,
    handleSubmit,
    submit,
    setUserData,
    disabled,
    setDisabled,
    userData,
  };
};
