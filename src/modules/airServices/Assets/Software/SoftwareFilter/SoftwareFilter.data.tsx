import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const softwareFilterValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  type: Yup?.string(),
  category: Yup?.string(),
  publisher: Yup?.string(),
  createdDate: Yup?.date(),
  updatedDate: Yup?.date(),
});

export const softwareFilterDefaultValues = {
  type: '',
  status: '',
  category: '',
  publisher: '',
  createdDate: '',
  updatedDate: '',
};

export const softwareFilterDataArray = [
  {
    id: 2435,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
      options: ['Restricted', 'Ignored', 'Managed', 'disabled', 'InReview'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 6546,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      select: true,
      options: ['Desktop', 'SaaS', 'Mobile'],
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    id: 5674,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 9877,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 6566,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      select: true,
      placeholder: 'Select a time period',
      options: [
        'NONE',
        'ALL_TIME',
        'TODAY',
        'YESTERDAY',
        'PREVIOUS_WEEK',
        'PREVIOUS_MONTH',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    id: 6785,
    componentProps: {
      name: 'updatedDate',
      label: 'Updated Date',
      fullWidth: true,
      select: true,
      placeholder: 'Select a time period',
      options: [
        'NONE',
        'ALL_TIME',
        'TODAY',
        'YESTERDAY',
        'PREVIOUS_WEEK',
        'PREVIOUS_MONTH',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
