import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const profileSecurityValidationSchema = Yup.object().shape({
  CurrentPassword: Yup.string().trim().required('Field is Required'),
  newPassword: Yup.string()
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
