import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  Email: Yup.string().trim().required('Field is Required'),
  password: Yup.string().required('Field is Required'),
});

export const loginDefaultValues = {
  Email: '',
  password: '',
};

export const loginDataArray = [
  {
    componentProps: {
      name: 'Email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'password',
      label: 'Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
