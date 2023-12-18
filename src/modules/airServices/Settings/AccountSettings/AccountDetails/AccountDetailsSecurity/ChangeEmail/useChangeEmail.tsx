import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  changeEmailValidationSchema,
  changeEmailDefaultValues,
  changeEmailDataArray,
} from './ChangeEmail.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useChangeEmail = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const ChangeEmailMethods = useForm({
    resolver: yupResolver(changeEmailValidationSchema),
    defaultValues: changeEmailDefaultValues,
  });

  const isSubmit = async () => {
    enqueueSnackbar('Email Change Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const { handleSubmit, reset } = ChangeEmailMethods;
  const handleSubmitChangeEmail = handleSubmit(isSubmit);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changeEmailFields = changeEmailDataArray(
    showPassword,
    togglePasswordVisibility,
  );

  return {
    ChangeEmailMethods,
    reset,
    handleSubmitChangeEmail,
    theme,
    changeEmailFields,
  };
};
