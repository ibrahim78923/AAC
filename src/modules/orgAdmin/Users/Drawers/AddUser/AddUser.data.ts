import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is Required'),
  middleName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
  jobTitle: Yup.string().required('Field is Required'),
  fbUrl: Yup.string().required('Field is Required'),
  linkinUrl: Yup.string().required('Field is Required'),
  twitterUrl: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  postCode: '',
  address: '',
  email: '',
  phoneNo: '',
  jobTitle: '',
  fbUrl: '',
  linkinUrl: '',
  twitterUrl: '',
};

export const addUsersArray = [
  {
    title: 'First Name',
    componentProps: {
      name: 'firstName',
      placeholder: 'Enter First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Middle Name',
    componentProps: {
      name: 'middleName',
      placeholder: 'Enter Middle Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Last Name',
    componentProps: {
      name: 'lastName',
      placeholder: 'Enter Last  Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Email',
    componentProps: {
      name: 'email',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    title: 'Phone Number',
    componentProps: {
      name: 'phoneNo',
      placeholder: 'Enter Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Post Code',
    componentProps: {
      name: 'postCode',
      placeholder: 'Enter Post Code',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Address',
    componentProps: {
      name: 'address',
      placeholder: 'Enter Address',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Job Title',
    componentProps: {
      name: 'jobTitle',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Facebook URL',
    componentProps: {
      name: 'fbUrl',
      placeholder: 'Enter Facebook URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    title: 'LinkedIn URL',
    componentProps: {
      name: 'linkinUrl',
      placeholder: 'Enter LinkedIn URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    title: 'Twitter URL',
    componentProps: {
      name: 'twitterUrl',
      placeholder: 'Enter Twitter URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
];
