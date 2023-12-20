import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const detailsValidationSchema = Yup?.object()?.shape({
  CompanyName: Yup?.string()?.trim()?.required('Field is Required'),
  DomainName: Yup?.string(),
  CompanyRegistrationNumber: Yup?.string(),
  CompanyOwner: Yup?.string(),
  PhoneNumber: Yup?.string(),
  Industry: Yup?.string(),
  CompanyType: Yup?.string(),
  NumberOfEmployees: Yup?.string(),
  AnnualRevenue: Yup?.string(),
  City: Yup?.string(),
  PostalCode: Yup?.string(),
  LifeCycleStage: Yup?.string(),
  LastActivityDate: Yup?.string(),
  CreatedDate: Yup?.string(),
  time: Yup?.string(),
  LinkedInCompanyPage: Yup?.string(),
  Address: Yup?.string(),
});

export const detailsDefaultValues = {
  CompanyName: '',
  DomainName: '',
  CompanyRegistrationNumber: '',
  CompanyOwner: '',
  PhoneNumber: '',
  Industry: '',
  CompanyType: '',
  NumberOfEmployees: '',
  AnnualRevenue: '',
  City: '',
  PostalCode: '',
  LifeCycleStage: '',
  LastActivityDate: '',
  CreatedDate: '',
  time: '',
  LinkedInCompanyPage: '',
  Address: '',
};

export const detailsDataArray = [
  {
    componentProps: {
      name: 'CompanyName',
      label: 'Company Name',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'DomainName',
      label: 'Domain Name',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'CompanyRegistrationNumber',
      label: 'Company Registration Number',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'CompanyOwner',
      label: 'Company Owner',
      select: true,
    },
    options: [
      { value: 'New Business', label: 'New Business' },
      { value: 'Existing Business', label: 'Existing Business' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'PhoneNumber',
      label: 'Phone Number',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'Industry',
      label: 'Industry',
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'CompanyType',
      label: 'Company Type',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Follow Up', label: 'Follow Up' },
      { value: 'Under Review', label: 'Under Review' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'NumberOfEmployees',
      label: 'Number of Employees',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'AnnualRevenue',
      label: 'Annual Revenue',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'City',
      label: 'City',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'PostalCode',
      label: 'Postal Code',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'LifeCycleStage',
      label: 'Life Cycle Stage',
      select: true,
    },
    options: [
      { value: 'Jack', label: 'Jack' },
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Rachel Stalk', label: 'Rachel Stalk' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'LastActivityDate',
      label: 'Last Activity Date',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'CreatedDate',
      label: 'Created Date',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'time',
      label: '------',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'LinkedInCompanyPage',
      label: 'LinkedIn Company page',
      fullWidth: true,
      placeholder: 'Type Here',
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'Address',
      label: 'Address',
      fullWidth: true,
      placeholder: 'Type Here',
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'Description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Type Here',
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 4,
  },
];
