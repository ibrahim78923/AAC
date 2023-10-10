import RHFTextField from '@/components/ReactHookForm/RHFTextField';

import * as Yup from 'yup';

//filter drwaer form
export const validationSchema = Yup.object().shape({
  userType: Yup.string().required('Field is Required'),
  firstName: Yup.string().required('Field is Required'),
  middleName: Yup.string().required('Field is Required'),
  lastName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  crnNumber: Yup.string().required('Field is Required'),
  companyName: Yup.string().required('Field is Required'),
  phoneNo: Yup.string().required('Field is Required'),
  postCode: Yup.string().required('Field is Required'),
  address: Yup.string().required('Field is Required'),
  jobTitle: Yup.string().required('Field is Required'),
  fbUrl: Yup.string().required('Field is Required'),
  linkinUrl: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  userType: '', //1
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  crnNumber: '',
  companyName: '',
  phoneNo: '',
  postCode: '',
  address: '',
  jobTitle: '',
  fbUrl: '',
  linkinUrl: '',
};

export const addUsersArray = [
  {
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastName',
      label: 'Last  Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'crnNumber',
      label: 'Company Registration Number(CRN)',
      fullWidth: true,
    },
    toShow: ['CompanyOwner'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyName',
      label: 'Company  Name',
      fullWidth: true,
    },
    toShow: ['CompanyOwner'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone Number',
      fullWidth: true,
    },
    toShow: ['CompanyOwner', 'SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'fbUrl',
      label: 'Facebook URL',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'linkinUrl',
      label: 'LinkedIn URL',
      fullWidth: true,
    },
    toShow: ['SuperAdmin'],
    component: RHFTextField,
    md: 12,
  },
];
