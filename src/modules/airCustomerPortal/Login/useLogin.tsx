import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginFormFields,
  loginDefaultValues,
  loginValidationSchema,
} from './Login.data';
import { useAuthCustomerLoginMutation } from '@/services/airCustomerPortal/auth';
import useAuth from '@/hooks/useAuth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export default function useLogin() {
  const router: any = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const method = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: loginDefaultValues,
  });
  const { handleSubmit, reset } = method;

  const dataArray = loginFormFields(showPassword, setShowPassword);

  const [postSignInTrigger, postSignInStatus] = useAuthCustomerLoginMutation();

  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await postSignInTrigger(data)?.unwrap();
      login(res);
      successSnackbar('Logged In Successfully!');
      reset();
      router?.push(AIR_CUSTOMER_PORTAL?.CUSTOMER_PORTAL_DASHBOARD);
    } catch (error: any) {
      errorSnackbar();
    }
  };

  return { method, handleSubmit, onSubmit, dataArray, postSignInStatus };
}
