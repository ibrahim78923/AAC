import { RHFSelect } from '@/components/ReactHookForm';

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
    },

    options: [
      { value: 'Restricted', label: 'Restricted' },
      { value: 'Ignored', label: 'Ignored' },
      { value: 'Managed', label: 'Managed' },
      { value: 'disabled', label: 'disabled' },
      { value: 'InReview', label: 'In Review' },
    ],

    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'Desktop', label: 'Desktop' },
      { value: 'SaaS', label: 'SaaS' },
      { value: 'Mobile', label: 'Mobile' },
    ],

    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: false,
    },

    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
      select: false,
    },

    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'None', label: 'None' },
      { value: 'AllTime', label: 'All Time' },
      { value: 'Today', label: 'Today' },
      { value: 'Yesterday', label: 'Yesterday' },
      { value: 'PreviousWeek', label: 'Previous Week' },
      { value: 'PreviousMonth', label: 'Previous Month' },
    ],

    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'updatedDate',
      label: 'Updated Date',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'None', label: 'None' },
      { value: 'AllTime', label: 'All Time' },
      { value: 'Today', label: 'Today' },
      { value: 'Yesterday', label: 'Yesterday' },
      { value: 'PreviousWeek', label: 'Previous Week' },
      { value: 'PreviousMonth', label: 'Previous Month' },
    ],

    component: RHFSelect,
    md: 12,
  },
];
