import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const profileSecurityValidationSchema = Yup.object().shape({
  CurrentPassword: Yup.string().trim().required('Field is Required'),
  newPassword: Yup.string().required('Field is Required'),
  confirmPassword: Yup.string().trim().required('Field is Required'),
});

export const profileSecurityDefaultValues = {
  CurrentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const profileSecurityDataArray = [
  {
    componentProps: {
      name: 'CurrentPassword',
      label: 'Current Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 7,
  },
  {
    componentProps: {
      name: 'newPassword',
      label: 'new Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 7,
  },
  {
    componentProps: {
      name: 'confirmPassword',
      label: 'Confirm Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 7,
  },
];
