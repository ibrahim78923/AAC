import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  firstName: '',
  lastName: '',
  postCode: '',
  address: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  facebookUrl: '',
  linkedInUrl: '',
  twitterUrl: '',
};

export const addUsersArray = [
  {
    componentProps: {
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Enter Last  Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Email',
      name: 'email',
      placeholder: 'Enter Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      label: 'Phone Number',
      name: 'phoneNumber',
      placeholder: 'Enter Number',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Post Code',
      name: 'postCode',
      placeholder: 'Enter Post Code',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Address',
      name: 'address',
      placeholder: 'Enter Address',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Job Title',
      name: 'jobTitle',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Facebook URL',
      name: 'facebookUrl',
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'LinkedIn URL',
      name: 'linkedInUrl',
      placeholder: 'Enter LinkedIn URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Twitter URL',
      name: 'twitterUrl',
      placeholder: 'Enter Twitter URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
