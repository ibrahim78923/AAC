import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

export const CreateViewData = [
  {
    title: 'Name',
    componentProps: {
      name: 'Name',
      label: 'Enter Name',
      select: false,
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
    title: 'Deal Pipeline',
    componentProps: {
      name: 'DealPipline',
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
    title: 'Deal Owner',
    componentProps: {
      name: 'DealName',
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
    title: 'Deal Owner',
    componentProps: {
      name: 'DealOwner',
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
    title: 'Close Date',
    componentProps: {
      name: 'CloseDate',
      label: 'Moday,January 30,2023 12:50 PM',
    },
    component: RHFDatePicker,
  },
  {
    title: 'Deal Stage',
    componentProps: {
      name: 'DealStage',
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
