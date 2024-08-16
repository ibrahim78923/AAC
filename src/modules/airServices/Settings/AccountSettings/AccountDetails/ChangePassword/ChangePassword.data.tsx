import { RHFTextField } from '@/components/ReactHookForm';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import * as Yup from 'yup';
import { ARRAY_INDEX } from '@/constants/strings';

export const changePasswordValidationSchema = Yup?.object()?.shape({
  currentPassword: Yup?.string()
    ?.required('Required')
    ?.max(30, 'Password up to 30 characters'),
  newPassword: Yup?.string()
    ?.required('Required')
    ?.min(8, 'Password must be at least 8 characters')
    ?.max(30, 'Password up to 30 characters')
    ?.matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password should be at least 8 characters long having 1 Capital letter, 1 Small letter and 1 number digit and 1 Special Character',
    ),
  confirmPassword: Yup?.string()
    ?.required('Required')
    ?.oneOf([Yup?.ref('newPassword')], 'Password must match with new password'),
});

export const changePasswordDefaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const changePasswordDataArray = (
  showPassword: boolean[],
  togglePasswordVisibility: (index: number) => void,
) => [
  {
    _id: 2786,
    gridLength: 6,
    componentProps: {
      name: 'currentPassword',
      label: 'Current Password',
      size: 'small',
      required: true,
      type: showPassword[ARRAY_INDEX?.ZERO] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => togglePasswordVisibility(ARRAY_INDEX?.ZERO)}
              edge="end"
            >
              {showPassword[ARRAY_INDEX?.ZERO] ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
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
      type: showPassword[ARRAY_INDEX?.ONE] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => togglePasswordVisibility(ARRAY_INDEX?.ONE)}
              edge="end"
            >
              {showPassword[ARRAY_INDEX?.ONE] ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
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
      type: showPassword[ARRAY_INDEX?.TWO] ? 'text' : 'password',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => togglePasswordVisibility(ARRAY_INDEX?.TWO)}
              edge="end"
            >
              {showPassword[ARRAY_INDEX?.TWO] ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
];
