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
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last  Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone Number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'fbUrl',
      label: 'Facebook URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'linkinUrl',
      label: 'LinkedIn URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter URL',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
];
