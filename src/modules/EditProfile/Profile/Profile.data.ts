import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const editProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Field is Required'),
  lastName: Yup.string().trim().required('Field is Required'),
  email: Yup.string(),
  mobileNumber: Yup.string(),
  phoneNumber: Yup.string(),
  companyName: Yup.string(),
  jobTitle: Yup.string().min(2, 'Job title must be at least 2 characters long'),
  language: Yup.string(),
  linkedInUrl: Yup.string().url('Please enter a valid URL').optional(),
  facebookUrl: Yup.string().url('Please enter a valid URL').optional(),
  twitterUrl: Yup.string().url('Please enter a valid URL').optional(),
});

export const editProfileDataArray = [
  {
    componentProps: {
      color: '#7a7a7b',
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
      placeholder: 'Enter First Name',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      fullWidth: true,
      placeholder: 'Enter Last Name',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'mobileNumber',
      label: 'Work Phone Number',
      placeholder: 'Enter Phone Number',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'phoneNumber',
      label: 'Mobile Number',
      fullWidth: true,
      placeholder: 'Enter Mobile Number',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      fullWidth: true,
      placeholder: 'Enter Company Name',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
      placeholder: 'Enter Job Title',
    },
    component: RHFTextField,
    md: 6,
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
      name: 'language',
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
      name: 'twitterUrl',
      label: 'TwitterURL',
      fullWidth: true,
      placeholder: 'Enter Twitter URL',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook URL',
      fullWidth: true,
      placeholder: 'Enter Facebook URL',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn URL',
      fullWidth: true,
      placeholder: 'Enter Linked URL',
    },
    component: RHFTextField,
    md: 6,
  },
];
