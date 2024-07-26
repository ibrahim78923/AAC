import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const assigneeValidationSchema = Yup?.object()?.shape({
  taskname: Yup?.string()?.trim()?.required('Field is Required'),
});

export const assigneeDefaultValues = {
  taskname: '',
};

export const assigneeDataArray = [
  {
    componentProps: {
      name: 'tasktype',
      label: 'Task Type',
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
