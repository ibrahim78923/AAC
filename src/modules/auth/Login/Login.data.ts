import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
  password: Yup?.string()?.required('Field is Required'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};

export const loginDataArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter Email',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'password',
      label: 'Password',
      fullWidth: true,
      placeholder: 'Enter Password',
    },
    component: RHFTextField,
    md: 12,
  },
];
