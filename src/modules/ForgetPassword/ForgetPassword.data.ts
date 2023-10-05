import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const forgetPasswordValidationSchema = Yup.object().shape({
  ForgetPassword: Yup.string().trim().required('Field is Required'),
});

export const forgetPasswordDefaultValues = {
  ForgetPassword: '',
};

export const forgetPasswordDataArray = [
  {
    componentProps: {
      name: 'ForgetPassword',
      label: 'Forget Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
