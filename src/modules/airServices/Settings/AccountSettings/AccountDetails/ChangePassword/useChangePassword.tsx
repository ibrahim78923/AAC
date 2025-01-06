import {
  changePasswordValidationSchema,
  changePasswordDefaultValues,
  changePasswordDataArray,
} from './ChangePassword.data';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { usePostServiceAccountDetailChangePasswordMutation } from '@/services/airServices/settings/account-settings/account-details';
import { IChangePasswordData } from './ChangePassword.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useChangePassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState([false, false, false]);

  const changePasswordMethodProps = {
    validationSchema: changePasswordValidationSchema,
    defaultValues: changePasswordDefaultValues,
  };

  const [postChangePasswordTrigger, postChangePasswordProgress] =
    usePostServiceAccountDetailChangePasswordMutation();

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

  const { handleSubmit, reset, methods } = useFormLib(
    changePasswordMethodProps,
  );
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
    methods,
    reset,
    handleSubmitChangePassword,
    theme,
    changePasswordDataArray,
    changePasswordFields,
    postChangePasswordProgress,
  };
};
