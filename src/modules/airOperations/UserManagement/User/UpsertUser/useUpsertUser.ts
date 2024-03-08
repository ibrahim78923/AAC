import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserData,
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { useState } from 'react';
import { usePostUserListMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertUser = (setIsDrawerOpen: any) => {
  const [postNewUserTrigger] = usePostUserListMutation();
  const [userData, setUserData] = useState<any[]>(upsertUserData);
  const [disabled, setDisabled] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const submit = async (data: any) => {
    const body = {
      ...data,
    };
    if (disabled) {
      setDisabled(false);
    } else {
      try {
        await postNewUserTrigger({ body })?.unwrap();
        successSnackbar('user Added successfully');
      } catch (error) {
        errorSnackbar();
      }

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
