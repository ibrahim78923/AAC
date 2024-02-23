import { EyeIcon, EyeSlashIcon } from '@/assets/icons';
import { RHFTextField } from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';

export const loginValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.required('Required'),
  password: Yup?.string()?.required('Required'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};

export const loginFormFields = (showPassword: any, setShowPassword: any) => [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'johndoe@gmail.com',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      placeholder: '***********',
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((show: any) => !show)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },

    component: RHFTextField,
  },
];
