import { RHFTextField } from '@/components/ReactHookForm';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup?.object()?.shape({
  currentPassword: Yup?.string()
    ?.required('Required')
    ?.max(100, 'Password up to 100 characters'),
  newPassword: Yup?.string()
    ?.required('Required')
    ?.min(8, 'Password must be at least 8 characters')
    ?.max(100, 'Password up to 100 characters')
    ?.matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password should be at least 8 characters long having 1 Capital letter, 1 Small letter and 1 number digit and 1 Special Character',
    ),
  confirmPassword: Yup?.string()
    ?.required('Required')
    ?.oneOf([Yup?.ref('newPassword')], 'Passwords must match'),
});

export const changePasswordDefaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const changePasswordDataArray = (
  showPassword: boolean[],
  togglePasswordVisibility: any,
) => [
  {
    _id: 2786,
    gridLength: 6,
    componentProps: {
      name: 'currentPassword',
      label: 'Current Password',
      size: 'small',
      required: true,
      type: showPassword[0] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => togglePasswordVisibility(0)} edge="end">
              {showPassword[0] ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
  {
    _id: 6578,
    gridLength: 6,
    componentProps: {
      name: 'newPassword',
      label: 'New Password',
      size: 'small',
      required: true,
      type: showPassword[1] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => togglePasswordVisibility(1)} edge="end">
              {showPassword[1] ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
  {
    _id: 9478,
    gridLength: 6,
    componentProps: {
      name: 'confirmPassword',
      label: 'Confirm Password',
      size: 'small',
      required: true,
      type: showPassword[2] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => togglePasswordVisibility(2)} edge="end">
              {showPassword[2] ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
];
