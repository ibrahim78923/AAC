import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const salesWorkflowsFilterValues = {
  status: '',
  createdBy: null,
  type: '',
};
const statusOption = ['ACTIVE', 'INACTIVE', 'DRAFT'];
const typeOptions = ['EVENT_BASE', 'SCHEDULED'];

export const salesWorkflowFilterFields = (userDropdown: any) => [
  {
    id: 434,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      placeholder: 'Select',
      options: statusOption,
    },
    component: RHFAutocomplete,
  },
  {
    id: 865,
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
  },
  {
    id: 238,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Select',
      options: typeOptions,
    },
    component: RHFAutocomplete,
  },
];
