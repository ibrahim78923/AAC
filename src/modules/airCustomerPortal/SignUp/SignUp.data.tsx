import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { IconButton, InputAdornment } from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@/assets/icons';

export const SignUpDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: null,
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

export const SignUpValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()?.trim()?.required('Required')?.max(30),
  lastName: Yup?.string()?.trim()?.required('Required')?.max(30),
  email: Yup?.string()
    ?.trim()
    ?.required('Required')
    ?.max(100)
    ?.email('Invalid Email'),
  companyName: Yup?.string()?.nullable(),
  phoneNumber: Yup?.string()?.required('Required'),
  password: Yup?.string()
    ?.required('Required')
    ?.max(30, 'Password should be less than 30 characters')
    ?.min(8, 'Password should contain at least 8 characters')
    ?.matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/,
      'Password must include at least 1 capital letter, 1 small letter, 1 numeric digit, and 1 special character',
    ),
  confirmPassword: Yup?.string()
    ?.required('Required')
    ?.oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const getSignUpFormFields = ({ apiQueryCompany }: any) => [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter Phone Number',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      placeholder: 'Enter Company Name',
      apiQuery: apiQueryCompany,
      queryKey: 'product',
    },
    component: RHFAutocompleteAsync,
  },
];

export const createPasswordFields = (
  togglePasswordVisibility: any,
  passwordVisibility: any,
) => [
  {
    id: 6,
    componentProps: {
      name: 'password',
      label: 'Create Password',
      placeholder: 'Enter Password',
      type: passwordVisibility?.password ? 'text' : 'password',
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => togglePasswordVisibility('password')}>
              {passwordVisibility?.password ? <EyeSlashIcon /> : <EyeIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Enter password',
      type: passwordVisibility?.confirmPassword ? 'text' : 'password',
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {passwordVisibility?.confirmPassword ? (
                <EyeSlashIcon />
              ) : (
                <EyeIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
  },
];
