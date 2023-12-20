import { RHFTextField } from '@/components/ReactHookForm';

export const CreateViewData = [
  {
    componentProps: {
      name: 'Name',
      label: 'Name',
      placeholder: 'Enter Name',
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
