import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const SignUpFormDefaultValues = {
  password: '',
  confirmpassword: '',
};
export const SignUpFormValidationSchema: any = Yup?.object()?.shape({
  password: Yup?.string()
    ?.required('Password is required')
    ?.max(30, 'Password should be less than 30 characters')
    ?.min(8, 'Password should contain at least 8 characters')
    ?.matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/,
      'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
  confrimpassword: Yup?.string()
    ?.required('Please Confrim your Password')
    ?.oneOf([Yup.ref('password')], 'Password must match'),
});
export const SignUpFormFields = [
  {
    componentProps: {
      id: '1',
      name: 'password',
      label: 'password',
      placeholder: 'Enter Password',
      type: 'string',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '2',
      name: 'confrimpassword',
      label: 'confrim password',
      placeholder: 'Enter password',
      type: 'string',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
];
