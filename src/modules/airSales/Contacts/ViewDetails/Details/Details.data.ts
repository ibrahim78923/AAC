import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const detailsValidationSchema = Yup?.object()?.shape({
  candidates: Yup?.string()?.trim()?.required('Field is Required'),
  applyDate: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
});

export const detailsDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const detailsDataArray = [
  {
    label: 'first Name',
    componentProps: {
      name: 'Ahmed',
      placeholder: 'Ahmed',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Last Name',
    componentProps: {
      name: 'khan',
      placeholder: 'Khan',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Email',
    componentProps: {
      name: 'email',
      placeholder: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Address',
    componentProps: {
      name: 'Address',
      placeholder: '7 Park Lane, Birmingham',
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
    label: 'Date of birth',
    componentProps: {
      name: 'dateofbirth',
      placeholder: '10/04/2023',
      select: false,
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 4,
  },
  {
    label: 'Contact Owner',
    componentProps: {
      name: 'ahmed',
      placeholder: 'Ahmed',
      select: true,
    },
    options: [
      { value: 'No owner', label: 'No owner' },
      { value: 'John Smith', label: 'John Smith' },
      { value: 'Emma Jhonson', label: 'Emma Jhonson' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    label: 'Phone Number',
    componentProps: {
      name: '+44 063556245',
      placeholder: '+44 063556245',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'WhatsApp Number',
    componentProps: {
      name: '+44 063556245',
      placeholder: '+44 063556245',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Lifecycle Stage ',
    componentProps: {
      name: 'Lead',
      placeholder: 'Lead',
      select: true,
    },
    options: [
      { value: 'Subscriber', label: 'Subscriber' },
      { value: 'Lead', label: 'Lead' },
      { value: 'Marketing Qualified Lead', label: 'Marketing Qualified Lead' },
      { value: 'Sales Qualified Lead', label: 'Sales Qualified Lead' },
      { value: 'Opportunity', label: 'Opportunity' },
      { value: 'Customer', label: 'Customer' },
      { value: 'Other', label: 'Other' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    label: 'Job title',
    componentProps: {
      name: 'Data Scientist',
      placeholder: 'Data Scientist',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Status',
    componentProps: {
      name: 'new',
      placeholder: 'New',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 4,
    options: [
      { value: 'Subscriber', label: 'Subscriber' },
      { value: 'Lead', label: 'Lead' },
      { value: 'Marketing Qualified Lead', label: 'Marketing Qualified Lead' },
      { value: 'Sales Qualified Lead', label: 'Sales Qualified Lead' },
      { value: 'Opportunity', label: 'Opportunity' },
      { value: 'Customer', label: 'Customer' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    label: 'Date of joining',
    componentProps: {
      name: 'dateofjoining',
      placeholder: '10/04/2023',
      select: false,
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 4,
  },
];

export const systemInformationDataArray = [
  {
    label: 'Created at',
    componentProps: {
      name: 'createdAt',
      placeholder: 'Created at',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Created by',
    componentProps: {
      name: 'createdBy',
      placeholder: 'Created by',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Updated at',
    componentProps: {
      name: 'updatedAt',
      placeholder: 'Updated at',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Updated by',
    componentProps: {
      name: 'updatedby',
      placeholder: 'Updated by',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Last Activity',
    componentProps: {
      name: 'lastActivity',
      placeholder: 'Last Activity',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Next ACtivity',
    componentProps: {
      name: 'nextActivity',
      placeholder: 'Next ACtivity',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    label: 'Last Contacted',
    componentProps: {
      name: 'lastContacted',
      placeholder: 'Last Contacted',
      select: false,
    },
    component: RHFTextField,
    md: 4,
  },
];
