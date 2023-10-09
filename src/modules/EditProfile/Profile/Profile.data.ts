import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
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
  firstName: '', //2
  middleName: '',
  lastName: '',
  WorkPhoneNumber: '',
  MobileNumber: '',
  CompanyName: '',
  JobTitle: '',
  Language: '', //4
  TwitterURL: '',
  FacebookURL: '',
  LinedInURL: '',
};

export const editProfileDataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
    },
    heading: 'Work Information',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'WorkPhoneNumber',
      label: 'Work Phone Number',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'MobileNumber',
      label: 'Mobile Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'CompanyName',
      label: 'Company Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'JobTitle',
      label: 'Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
    },
    heading: 'Other Information',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'Language',
      label: 'Language',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'English', label: 'English' },
      { value: 'urdu', label: 'urdu' },
      { value: 'French', label: 'French' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'TwitterURL',
      label: 'TwitterURL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'FacebookURL',
      label: 'Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'LinedInURL',
      label: 'LinedIn URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
