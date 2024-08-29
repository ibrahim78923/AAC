import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

export const predefinedLifeCycleStageFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Add stage name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      required: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
