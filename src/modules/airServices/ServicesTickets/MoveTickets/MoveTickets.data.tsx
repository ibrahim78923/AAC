import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import * as Yup from 'yup';

export const moveTicketsValidationSchema = Yup?.object()?.shape({
  department: Yup?.mixed()?.nullable()?.required('Department is Required'),
  agent: Yup?.mixed()?.nullable()?.required('Agent is Required'),
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
    id: 1,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Department',
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      required: true,
      placeholder: 'Choose Agent',
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
];
