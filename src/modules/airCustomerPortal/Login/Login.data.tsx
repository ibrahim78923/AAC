import { EyeIcon, EyeSlashIcon } from '@/assets/icons';
import { RHFTextField } from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';

export const loginValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.required('Email is Required'),
  password: Yup?.string()?.required('Password is Required'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};

export const loginFormFields = (showPassword:any, handleClickShowPassword :any)=> [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      type: 'email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'password',
      label: 'Password',
      fullWidth: true,
      type: 'password',
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => handleClickShowPassword()}
            >
              {!showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  
    component: RHFTextField,
  },
];
