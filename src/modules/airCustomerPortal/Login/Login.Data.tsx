import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loginValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.required('Email is Required'),
  password: Yup?.string()?.required('Password is Required'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};
export const loginFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      type: 'email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'password',
      label: 'Password',
      fullWidth: true,
      type: 'password',
      required: true,
    },
    component: RHFTextField,
  },
];
