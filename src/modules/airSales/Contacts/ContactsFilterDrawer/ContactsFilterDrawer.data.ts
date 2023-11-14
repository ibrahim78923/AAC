import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

export const FilterData = [
  {
    title: 'Contact Owner',
    componentProps: {
      name: 'ContactOwner',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'All Pipelines', label: 'All Pipelines' },
      { value: 'Sales Pipelines', label: 'Sales Pipelines' },
      { value: 'Recruitment Pipelines', label: 'Recruitment Pipelines' },
      { value: 'Test Pipelines', label: 'Test Pipelines' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Lifecycle Stage',
    componentProps: {
      name: 'LifecycleStage',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Air Apple Cart', label: 'Air Apple Cart' },
      { value: 'Phoenix Baker', label: 'Phoenix Baker' },
      { value: 'Fooster App', label: 'Fooster App' },
      { value: 'Share My Dine', label: 'Share My Dine' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Status',
    componentProps: {
      name: 'Status',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'Savannah Shane', label: 'Savannah Shane' },
      { value: 'Phoenix Baker', label: 'Phoenix Baker' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Brooklyn Simmons', label: 'Brooklyn Simmons' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Created Date',
    componentProps: {
      name: 'CreatedDate',
      label: 'Select',
    },
    component: RHFDatePicker,
  },
  {
    title: 'Last Activity Date',
    componentProps: {
      name: 'LastActivityDate',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Follow Up', label: 'Follow Up' },
      { value: 'Under Review', label: 'Under Review' },
      { value: 'Demo', label: 'Demo' },
      { value: 'Negotiation', label: 'Negotiation' },
      { value: 'Won', label: 'Won' },
      { value: 'Lost', label: 'Lost' },
    ],
    component: RHFTextField,
  },
  {
    title: 'Next Activity Date',
    componentProps: {
      name: 'NextActivityDate',
      label: 'Select',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Follow Up', label: 'Follow Up' },
      { value: 'Under Review', label: 'Under Review' },
      { value: 'Demo', label: 'Demo' },
      { value: 'Negotiation', label: 'Negotiation' },
      { value: 'Won', label: 'Won' },
      { value: 'Lost', label: 'Lost' },
    ],
    component: RHFTextField,
  },
];
