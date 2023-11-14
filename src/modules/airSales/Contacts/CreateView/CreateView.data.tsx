import { RHFTextField } from '@/components/ReactHookForm';

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
];
