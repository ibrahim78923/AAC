import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const createComapnySchema = Yup?.object()?.shape({
  domainName: Yup?.string()?.required('Field is Required'),
});

export const defaultCreateCompanyValues = {
  domainName: '',
  companyName: '',
  companyOwner: '',
  industry: '',
  companyType: '',
  noOfEmployees: '',
  totalRevenue: '',
  city: '',
  postCode: '',
  companyAddress: '',
  description: '',
  linkdInCompany: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'domainName',
      label: 'Company Domain Name (URL)',
      placeholder: 'Enter here',
      required: true,
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      placeholder: 'Company name',
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
    options: [
      { value: '-', label: '-' },
      { value: 'Savannah Shane', label: 'Savannah Shane' },
    ],
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
    options: [
      { value: '-', label: '-' },
      { value: 'Savannah Shane', label: 'Savannah Shane' },
    ],
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
    options: [
      { value: '-', label: '-' },
      { value: 'Savannah Shane', label: 'Savannah Shane' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'noOfEmployees',
      label: 'No of Employees',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'totalRevenue',
      label: 'Total Revenue',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'city',
      label: 'City',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'postCode',
      label: 'Postal Code',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'companyAddress',
      label: 'Company Address',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 3,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'linkdInCompany',
      label: 'LinkdIn Company Page',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
];
