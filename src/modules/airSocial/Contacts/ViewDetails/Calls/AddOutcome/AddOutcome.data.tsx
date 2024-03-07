import { RHFEditor, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const outcomesValidationSchema = Yup?.object()?.shape({
  reschedule: Yup?.string()?.trim()?.required('Field is Required'),
  date: Yup?.string()?.trim()?.required('Field is Required'),
  time: Yup?.string()?.trim()?.required('Field is Required'),
});

export const outcomesDataArray = [
  {
    componentProps: {
      name: 'addoutcome',
      label: 'Add Outcome',
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
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
