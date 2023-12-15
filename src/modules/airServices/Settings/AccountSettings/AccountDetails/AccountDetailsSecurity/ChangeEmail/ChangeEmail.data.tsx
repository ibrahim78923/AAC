import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const changeEmailValidationSchema = Yup?.object()?.shape({
  currentPassword: Yup?.string()
    ?.required('Required')
    ?.max(100, 'Password up to 100 characters'),
  newEmail: Yup?.string()
    ?.email('Invalid email')
    ?.required('Required')
    ?.max(100, 'Email up to 100 characters'),
});

export const changeEmailDefaultValues = {
  currentPassword: '',
  newEmail: '',
};

export const changeEmailDataArray = (
  showPassword: boolean,
  togglePasswordVisibility: any,
) => [
  {
    _id: 2786,
    gridLength: 6,
    icon: true,
    componentProps: {
      name: 'currentPassword',
      label: 'Current Password',
      type: showPassword ? 'text' : 'password',
      size: 'small',
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => togglePasswordVisibility()} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
      name: 'newEmail',
      label: 'New Email',
      type: 'text',
      size: 'small',
      required: true,
    },
    component: RHFTextField,
  },
];
