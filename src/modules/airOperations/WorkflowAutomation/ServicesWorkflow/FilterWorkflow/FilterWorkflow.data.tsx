import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

const statusOption = ['ACTIVE', 'INACTIVE', 'DRAFT'];
export const filterWorkflowsValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  createdBy: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  status: '',
  createdBy: null,
};

export const filterWorkflowsDataFields = (userDropdown: any) => [
  {
    _id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      placeholder: 'Select',
      options: statusOption,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    _id: 2,
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,
      placeholder: 'Select',
      apiQuery: userDropdown,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
