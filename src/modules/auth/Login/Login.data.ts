import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Required field'),
  password: Yup?.string()?.required('Required field'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};

export const loginDataArray = [
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
      // InputProps: {
      //   endAdornment: (
      //     <InputAdornment postion="start">
      //     <EyeIcon/>
      //     </InputAdornment>
      //   ),
      // },
    },
    component: RHFTextField,
    md: 12,
  },
];
