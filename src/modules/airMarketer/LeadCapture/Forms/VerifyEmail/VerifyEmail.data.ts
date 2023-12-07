import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const verifyEmailValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
});

export const verifyEmailDefaultValues = {
  email: '',
};

export const verifyEmailArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter form email',
    },
    component: RHFTextField,
    md: 12,
  },
];
