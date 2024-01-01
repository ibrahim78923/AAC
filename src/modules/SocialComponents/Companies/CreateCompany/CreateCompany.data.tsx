import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const createComapnySchema = Yup?.object()?.shape({
  domain: Yup?.string()?.required('Field is Required'),
});

export const defaultCreateCompanyValues = {
  domain: '',
  name: '',
  ownerId: '',
  industry: '',
  type: '',
  noOfEmloyee: '',
  totalRevenue: '',
  city: '',
  postalCode: '',
  address: '',
  description: '',
  linkedInUrl: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'domain',
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
      name: 'name',
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
      name: 'ownerId',
      label: 'Company Owner',
      fullWidth: true,
      select: true,
    },
    options: [{ value: '655633c2d9d816a1a1cfbeb2', label: 'Savannah Shane' }],
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
      { value: 'computerSoftware', label: 'Computer software' },
      { value: 'computerServices', label: 'Computer Services' },
      { value: 'construction', label: 'Construction' },
      { value: 'none', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Company Type',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'partner', label: 'Partner' },
      { value: 'vendor', label: 'Vendor' },
      { value: 'none', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'noOfEmloyee',
      label: 'No of Employees',
      placeholder: 'Enter here',
      fullWidth: true,
    },
    md: 12,
    component: RHFTextField,
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
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'address',
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
      name: 'linkedInUrl',
      label: 'LinkdIn Company Page',
      placeholder: 'Enter here',
      fullWidth: true,
    },
  },
];
