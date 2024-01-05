import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const companiesValidationSchema = Yup?.object()?.shape({});

export const companiesDefaultValues = {
  companieStatus: 'New Company',
  companyName: '',
  companyOwner: '',
  description: '',
  industury: '',
  city: '',
  postalCode: '',
  numberOfEmployees: '',
  annualRevenue: '',
  timeZone: '',
  companyPage: '',
  joiningDate: '',
  joiningTime: '',
};

export const companiesDataArray = [
  {
    componentProps: {
      name: 'companyDomainName',
      label: 'Company Domain Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyOwner',
      label: 'Company Owner',
      select: true,
    },
    options: [
      { value: 'Guy Hawkins', label: 'Guy Hawkins' },
      { value: 'Jacob Jones', label: 'Jacob Jones' },
      { value: 'Courtney Henry', label: 'Courtney Henry' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },

  {
    componentProps: {
      name: 'industry',
      label: 'Industry',
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Intern', label: 'Intern' },
      { value: 'Construction', label: 'Construction' },
      { value: 'Computer Science', label: 'Computer Science' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'city',
      label: 'City',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'numberOfEmployee',
      label: 'Number of employee',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'annualRevenue',
      label: 'Annual Revenue',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'timeZone',
      label: 'Time Zone',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyPage',
      label: 'Company Page',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'joiningDate',
      label: 'Joining Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'joiningTime',
      label: 'Joining Time ',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];

export const drawerTitle: any = {
  Add: 'Add companies',
  Edit: 'Edit companies',
  View: 'View companies',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
