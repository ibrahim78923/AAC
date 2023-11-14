import { RHFSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const moveTicketsValidationSchema = Yup?.object()?.shape({
  department: Yup?.string(),
  agent: Yup?.string(),
});

export const moveTicketsDefaultValue = (data: any) => {
  return {
    department: data?.department ?? '',
    agent: data?.agent ?? '',
  };
};

export const moveTicketsFormFields = [
  {
    id: 'department',
    component: RHFSearchableSelect,
    componentProps: {
      name: 'department',
      label: 'Select Department*',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
    },
  },
  {
    id: 'agent',
    component: RHFSearchableSelect,
    componentProps: {
      name: 'agent',
      label: 'Select Agent',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
    },
  },
];
