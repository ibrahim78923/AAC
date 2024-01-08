import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

export const FilterData = [
  {
    componentProps: {
      name: 'ContactOwner',
      label: 'Contact Owner',
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
    componentProps: {
      name: 'LifecycleStage',
      label: 'Lifecycle Stage',
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
    componentProps: {
      name: 'Status',
      label: 'Status',
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
    componentProps: {
      name: 'CreatedDate',
      label: 'Created Date',
    },
    component: RHFDatePicker,
  },
  {
    componentProps: {
      name: 'LastActivityDate',
      label: 'Last Activity Date',
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
    componentProps: {
      name: 'NextActivityDate',
      label: 'Next Activity Date',
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
