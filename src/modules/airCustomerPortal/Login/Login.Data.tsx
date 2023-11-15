import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loginValidationSchema: any = Yup?.object()?.shape({
  email: Yup?.string()?.required('Email is Required'),
  password: Yup?.string()?.required('Password is Required'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};
export const loginFormFields = [
  {
    componentProps: {
      id: '1',
      name: 'email',
      label: 'email',
      placeholder: 'johncide@gmail.com',
      type: 'email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '2',
      name: 'password',
      label: 'password',
      type: 'password',
      placeholder: '*******',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
];
