import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .required('Field is Required')
    .test(
      'email',
      'The Password must be at least 8 characters long having 1 capital letter,1 small letter and 1 numeric digit',
      function (value) {
        if (value) {
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value);
        }
        return true;
      },
    ),

  confirmPassword: Yup.string().trim().required('Field is Required'),
});

const data = {
  email: 'Invalid email address',
};

resetPasswordValidationSchema
  .validate(data)
  .then(() => {})
  .catch(() => {});

export const resetPasswordDefaultValues = {
  newPassword: '',
  confirmPassword: '',
};

export const resetPasswordDataArray = [
  {
    componentProps: {
      name: 'newPassword',
      label: 'New Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'confirmPassword',
      label: 'Confirm Password',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
