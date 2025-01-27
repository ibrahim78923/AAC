import { RHFTextField } from '@/components/ReactHookForm';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import * as Yup from 'yup';
import { ARRAY_INDEX } from '@/constants/strings';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const changePasswordValidationSchema = Yup?.object()?.shape({
  currentPassword: Yup?.string()
    ?.required('Current password is required')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_CHANGE_PASSWORD,
      `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_CHANGE_PASSWORD} `,
    ),
  newPassword: Yup?.string()
    ?.required('New password is required')
    ?.min(8, 'Password must be at least 8 characters')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_CHANGE_PASSWORD,
      `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_CHANGE_PASSWORD} `,
    )
    ?.matches(
      REGEX?.STRONG_PASSWORD_WITH_MINIMUM_COMPLEXITY,
      'Password should be at least 8 characters long having 1 Capital letter, 1 Small letter and 1 number digit and 1 Special Character',
    ),
  confirmPassword: Yup?.string()
    ?.required('Confirm password is required')
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
): ReactHookFormFieldsI[] => [
  {
    _id: 1,
    md: 7,
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
    _id: 2,
    md: 7,
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
    _id: 3,
    md: 7,
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
