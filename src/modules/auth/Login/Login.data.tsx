import { IconButton, InputAdornment } from '@mui/material';
import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@/assets/icons';

export const loginValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Required field'),
  password: Yup?.string()?.required('Required field'),
});

export const loginDefaultValues = {
  email: '',
  password: '',
};

export const loginDataArray = (
  handleClickShowPassword: any,
  handleMouseDownPassword: any,
  showPassword: any,
) => {
  return [
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
        type: showPassword ? 'text' : 'password',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword()}
                onMouseDown={handleMouseDownPassword}
              >
                {!showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      },
      component: RHFTextField,
      md: 12,
    },
  ];
};
