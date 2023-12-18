import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  changePasswordValidationSchema,
  changePasswordDefaultValues,
  changePasswordDataArray,
} from './ChangePassword.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useChangePassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState([false, false, false]);

  const ChangePasswordMethods = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const isSubmit = async () => {
    enqueueSnackbar('Password Change Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const { handleSubmit, reset } = ChangePasswordMethods;
  const handleSubmitChangePassword = handleSubmit(isSubmit);

  const togglePasswordVisibility = (index: any) => {
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
  };
};
