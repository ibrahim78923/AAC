import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const moveTicketsValidationSchema = Yup?.object()?.shape({
  department: Yup?.string()?.nullable(),
  agent: Yup?.string()?.nullable(),
});

export const moveTicketsDefaultValue = {
  department: null,
  agent: null,
};

export const moveTicketsFormFieldsDynamic = (
  apiQueryDepartment: any,
  apiQueryAgent: any,
) => [
  {
    id: 'department',
    component: RHFAutocompleteAsync,
    componentProps: {
      name: 'department',
      label: 'Select Department*',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
    },
  },
  {
    id: 'agent',
    component: RHFAutocompleteAsync,
    componentProps: {
      name: 'agent',
      label: 'Select Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
    },
  },
];
