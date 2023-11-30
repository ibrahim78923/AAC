import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createPasswordFormDefaultValues = {
  password: '',
  confirmPassword: '',
};

export const createPasswordValidationSchema: any = Yup?.object()?.shape({
  password: Yup?.string()
    ?.required('Password is required')
    ?.max(30, 'Password should be less than 30 characters')
    ?.min(8, 'Password should contain at least 8 characters')
    ?.matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/,
      'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
  confrimPassword: Yup?.string()
    ?.required('Please Confrim your Password')
    ?.oneOf([Yup.ref('password')], 'Password must match'),
});

export const createPasswordFields = [
  {
    id: 1,
    componentProps: {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'confrimPassword',
      label: 'Confrim Password',
      placeholder: 'Enter password',
      type: 'password',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
];
