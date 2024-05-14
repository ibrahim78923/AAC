import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';

const statusOptions = ['Active', 'Deactivate', 'Expired'];
export const filtersFormFieldsDefaultValues = (filterValues: any) => {
  return {
    date: filterValues?.date ?? null,
    status: filterValues?.status ?? '',
  };
};
export const filtersFormFieldsDataFunction = [
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'date',
      label: 'Date',
      placeholder: 'Date',
    },
    component: RHFDatePicker,
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
      options: statusOptions,
    },
    component: RHFAutocomplete,
  },
];
