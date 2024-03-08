import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';

export const companiesDataArray = (companyOwners: any) => [
  {
    id: 'domain',
    componentProps: {
      name: 'domain',
      label: 'Company Domain Name',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'name',
    componentProps: {
      name: 'name',
      label: 'Company Name',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'ownerId',
    componentProps: {
      name: 'ownerId',
      label: 'Company Owner',
      select: true,
      disabled: true,
    },
    options: companyOwners,
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'description',
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      disabled: true,
    },
    component: RHFEditor,
    md: 12,
  },

  {
    id: 'industry',
    componentProps: {
      name: 'industry',
      label: 'Industry',
      select: true,
      disabled: true,
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
    id: 'city',
    componentProps: {
      name: 'city',
      label: 'City',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'postalCode',
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'noOfEmloyee',
    componentProps: {
      name: 'noOfEmloyee',
      label: 'Number of employee',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'totalRevenue',
    componentProps: {
      name: 'totalRevenue',
      label: 'Annual Revenue',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'timeZone',
      label: 'Time Zone',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'companyPage',
    componentProps: {
      name: 'companyPage',
      label: 'Company Page',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'joiningDate',
    componentProps: {
      name: 'joiningDate',
      label: 'Joining Date',
      fullWidth: true,
      disabled: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 'joiningTime',
    componentProps: {
      name: 'joiningTime',
      label: 'Joining Time ',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];
