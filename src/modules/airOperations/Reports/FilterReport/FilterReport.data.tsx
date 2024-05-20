import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const reportFiltersDefaultValues: any = (filterValue: any) => {
  return {
    owner: filterValue?.owner ?? null,
    assigned: filterValue?.assigned ?? null,
    createdDate: filterValue?.createdDate ?? null,
  };
};

export const reportFilterFormFieldsDynamic = (shopApiQuery?: any) => [
  {
    id: 1,
    componentProps: {
      name: 'owner',
      label: 'Report Owner',
      placeholder: 'Select report owner',
      fullWidth: true,
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'assigned',
      label: 'Assigned',
      placeholder: 'Select Assignee',
      fullWidth: true,
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      placeholder: 'Select created date',
      fullWidth: true,
      options: [],
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
