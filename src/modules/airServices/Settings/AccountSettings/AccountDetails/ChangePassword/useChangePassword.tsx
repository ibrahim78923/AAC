import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  changePasswordValidationSchema,
  changePasswordDefaultValues,
  changePasswordDataArray,
} from './ChangePassword.data';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostChangePasswordMutation } from '@/services/airServices/settings/account-settings/account-details';
import { IChangePasswordData } from './ChangePassword.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useChangePassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState([false, false, false]);

  const ChangePasswordMethods = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const [postChangePasswordTrigger, postChangePasswordProgress] =
    usePostChangePasswordMutation();

  const isSubmit = async (data: IChangePasswordData) => {
    const payload = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
    };
    try {
      const res = await postChangePasswordTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Password Change Successfully');
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      reset();
    }
  };

  const { handleSubmit, reset } = ChangePasswordMethods;
  const handleSubmitChangePassword = handleSubmit(isSubmit);

  const togglePasswordVisibility = (index: number) => {
    setShowPassword((prev) => {
      const updatedShowPassword = [...prev];
      updatedShowPassword[index] = !updatedShowPassword[index];
      return updatedShowPassword;
    });
  };

  const changePasswordFields = changePasswordDataArray(
    showPassword,
    togglePasswordVisibility,
  );

  return {
    ChangePasswordMethods,
    reset,
    handleSubmitChangePassword,
    theme,
    changePasswordDataArray,
    changePasswordFields,
    postChangePasswordProgress,
  };
};
