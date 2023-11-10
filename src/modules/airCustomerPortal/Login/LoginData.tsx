import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const signUpValidationSchema: any = Yup.object().shape({
  email: Yup.string().required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

export const signUpDefaultValues = {
  Email: '',
  password: '',
};
export const signUpData = [
  {
    componentProps: {
      id: '1',
      name: 'email',
      label: 'email',
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
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
];
