import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const forgetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Required field')
    .test('email', 'Invalid email address', function (value) {
      if (value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
      }
      return true;
    }),
});

const data = {
  email: 'Invalid email address',
};

forgetPasswordValidationSchema
  .validate(data)
  .then(() => {})
  .catch(() => {});

export const forgetPasswordDefaultValues = {
  ForgetPassword: '',
};

export const forgetPasswordDataArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter Email',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];

export const changePasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Required field')
    .test('email', 'Invalid email address', function (value) {
      if (value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
      }
      return true;
    }),
  password: Yup.string()
    .trim()
    .required('Required field')
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
  code: Yup?.string(),
});

export const changePasswordDefaultValues = {
  email: '',
  password: '',
  code: '',
};

export const changePasswordDataArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter Email',
      required: true,
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
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'code',
      label: 'Code',
      fullWidth: true,
      placeholder: 'Enter Code',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
