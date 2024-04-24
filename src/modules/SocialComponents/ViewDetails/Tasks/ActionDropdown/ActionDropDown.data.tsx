import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const assigneeValidationSchema = Yup?.object()?.shape({
  tasktype: Yup?.string()?.trim()?.required('Field is Required'),
});

export const assigneeDefaultValues = {
  tasktype: '',
};

export const assigneeDataArray = [
  {
    componentProps: {
      name: 'tasktype',
      label: 'Task Type',
      select: true,
    },
    options: [
      { value: 'Call', label: 'Call' },
      { value: 'Email', label: 'Email' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
