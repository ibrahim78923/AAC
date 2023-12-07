import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginMethodsValidationSchema,
  loginMethodsDefaultValues,
  timeOutValidationSchema,
  timeOutDefaultValues,
} from './LoginMethods.data';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export const useLoginMethods = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const methods: any = useForm<any>({
    resolver: yupResolver(loginMethodsValidationSchema),
    defaultValues: loginMethodsDefaultValues(),
  });

  const timeOutMethods: any = useForm<any>({
    resolver: yupResolver(timeOutValidationSchema),
    defaultValues: timeOutDefaultValues(),
  });

  const theme = useTheme();
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    setTimeOut(methods?.getValues()?.sessionTimeout === true);
  }, [methods?.watch()]);

  return {
    methods,
    theme,
    timeOut,
    timeOutMethods,
    setIsOpenDrawer,
    isOpenDrawer,
  };
};
