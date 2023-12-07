import { Typography, useTheme } from '@mui/material';
import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const editProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Field is Required'),
  middleName: Yup.string(),
  lastName: Yup.string().trim().required('Field is Required'),
  WorkPhoneNumber: Yup.string(),
  MobileNumber: Yup.string(),
  CompanyName: Yup.string(),
  JobTitle: Yup.string(),
  Language: Yup.string(),
  TwitterURL: Yup.string(),
  FacebookURL: Yup.string(),
  LinedInURL: Yup.string(),
});

export const editProfileDefaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  WorkPhoneNumber: '',
  MobileNumber: '',
  CompanyName: '',
  JobTitle: '',
  Language: '',
  TwitterURL: '',
  FacebookURL: '',
  LinedInURL: '',
};

export const editProfileDataArray = () => {
  const theme = useTheme();
  return [
    {
      componentProps: {
        color: theme?.palette?.grey[500],
        varient: 'h4',
        heading: 'Work Information',
      },
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'firstName',
        label: 'First Name',
        fullWidth: true,
        required: true,
        placeholder: 'jhon',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'middleName',
        label: 'Middle Name',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'lastName',
        label: 'Last Name',
        required: true,
        placeholder: 'Doe',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {},
      component: Typography,
      md: 5,
    },
    {
      componentProps: {
        name: 'WorkPhoneNumber',
        label: 'Work Phone Number',
        fullWidth: true,
        placeholder: 'Phone number',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'MobileNumber',
        label: 'Mobile Number',
        fullWidth: true,
        placeholder: '+1212345',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'CompanyName',
        label: 'Company Name',
        fullWidth: true,
        placeholder: 'Orcalo Holdings',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'JobTitle',
        label: 'Job Title',
        fullWidth: true,
        placeholder: 'UI UX Designer',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        color: '#7a7a7b',
        varient: 'h4',
        heading: 'Other Information',
      },
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'FacebookURL',
        label: 'Facebook URL',
        fullWidth: true,
        placeholder: 'jhondoe@gmail.com',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'TwitterURL',
        label: 'TwitterURL',
        fullWidth: true,
        placeholder: 'jhondoe@gmail.com',
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        name: 'LinedInURL',
        label: 'LinedIn URL',
        fullWidth: true,
        placeholder: 'jhondoe@gmail.com',
      },
      component: RHFTextField,
      md: 5,
    },
  ];
};
