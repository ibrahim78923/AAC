import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';

const statusOptions = ['Active', 'Inactive', 'Expired'];
export const filtersFormFieldsDefaultValues = (filterValues: any) => {
  return {
    dateStart: filterValues?.dateStart ?? null,
    status: filterValues?.status ?? '',
  };
};
export const filtersFormFieldsDataFunction = [
  {
    _id: 2,
    componentProps: {
      fullWidth: true,
      name: 'dateStart',
      label: 'Created At',
      placeholder: 'Created At',
    },
    component: RHFDatePicker,
  },
  {
    _id: 920,
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
