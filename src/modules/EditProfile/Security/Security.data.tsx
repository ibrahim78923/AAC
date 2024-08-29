import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { IconButton, InputAdornment } from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@/assets/icons';

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

export const profileSecurityDataArray = (
  handleClickShowPassword: any,
  handleMouseDownPassword: any,
  isPassword: any,
) => {
  return [
    {
      componentProps: {
        name: 'CurrentPassword',
        label: 'Current Password',
        required: true,
        placeholder: 'Current Password',
        fullWidth: true,
        type: isPassword?.currentPassword ? 'text' : 'password',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('currentPassword')}
                onMouseDown={handleMouseDownPassword}
              >
                {!isPassword?.currentPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
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
        type: isPassword?.newPassword ? 'text' : 'password',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('newPassword')}
                onMouseDown={handleMouseDownPassword}
              >
                {!isPassword?.newPassord ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
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
        type: isPassword?.confirmPassword ? 'text' : 'password',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('confirmPassword')}
                onMouseDown={handleMouseDownPassword}
              >
                {!isPassword?.confirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      },
      component: RHFTextField,
      md: 7,
    },
  ];
};
