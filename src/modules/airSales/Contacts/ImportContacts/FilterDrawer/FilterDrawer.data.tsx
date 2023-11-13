import { RHFTextField } from '@/components/ReactHookForm';

export const importFilterData = [
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
    title: 'Deal Name',
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
];
