import { RHFAutocomplete } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const drawerFormValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  type: Yup?.string(),
  category: Yup?.string(),
  publisher: Yup?.string(),
  createdDate: Yup?.date(),
  updatedDate: Yup?.date(),
});

export const defaultValues = {
  type: '',
  status: '',
  category: '',
  publisher: '',
  createdDate: '',
  updatedDate: '',
};

export const dataArray = [
  {
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
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: false,
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
      select: false,
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      select: true,
      placeholder: 'Select a time period',
      options: [
        'None',
        'AllTime',
        'Today',
        'Yesterday',
        'PreviousWeek',
        'PreviousMonth',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    componentProps: {
      name: 'updatedDate',
      label: 'Updated Date',
      fullWidth: true,
      select: true,
      placeholder: 'Select a time period',
      options: [
        'None',
        'AllTime',
        'Today',
        'Yesterday',
        'PreviousWeek',
        'PreviousMonth',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
