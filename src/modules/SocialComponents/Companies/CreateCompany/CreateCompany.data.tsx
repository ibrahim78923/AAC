import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  domainName: Yup?.string()?.required('Field is Required'),
  name: Yup?.string()?.trim()?.required('Field is Required'),
  companyOwner: Yup?.string()?.trim()?.required('Field is Required'),
  industry: Yup?.string()?.trim()?.required('Field is Required'),
  companyType: Yup?.string()?.trim()?.required('Field is Required'),
  noOfEmployees: Yup?.string()?.trim()?.required('Field is Required'),
  totalRevenue: Yup?.string()?.trim()?.required('Field is Required'),
  streetName: Yup?.string()?.trim()?.required('Field is Required'),
  companyAddress: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
  linkdInCompany: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesOrganization = {
  domainName: '',
  name: '',
  companyOwner: '',
  industry: '',
  companyType: '',
  noOfEmployees: '',
  totalRevenue: '',
  streetName: '',
  companyAddress: '',
  description: '',
  city: '',
  linkdInCompany: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'domainName',
      label: 'Company Domain Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Company Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyOwner',
      label: 'Company Owner',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'industry',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyType',
      label: 'Company Type',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'noOfEmployees',
      fullWidth: true,
      label: 'No of Employees',
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'totalRevenue',
      fullWidth: true,
      label: 'Total Revenue',
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'city',
      fullWidth: true,
      label: 'City',
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'postCode',
      fullWidth: true,
      label: 'Postal Code',
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'companyAddress',
      fullWidth: true,
      label: 'Company Address',
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      fullWidth: true,
      label: 'Description',
      multiline: true,
      rows: 3,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'linkdInCompany',
      fullWidth: true,
      label: 'LinkdIn Company Page',
    },
  },
];
