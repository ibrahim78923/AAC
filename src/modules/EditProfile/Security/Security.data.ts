import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const profileSecurityValidationSchema = Yup.object().shape({
  CurrentPassword: Yup.string().trim().required('Field is Required'),
  newPassword: Yup?.string()
    ?.required('Password is required')
    ?.matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long',
    ),
  confirmPassword: Yup?.string()
    ?.oneOf([Yup?.ref('newPassword'), ''], 'Password must match')
    ?.required('Confirm Password is required'),
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
      required: true,
      placeholder: 'Current Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 7,
  },
  {
    componentProps: {
      name: 'newPassword',
      label: 'New Password',
      required: true,
      placeholder: 'New Password',
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
      required: true,
      placeholder: 'Confirm Password',
    },
    component: RHFTextField,
    md: 7,
  },
];
