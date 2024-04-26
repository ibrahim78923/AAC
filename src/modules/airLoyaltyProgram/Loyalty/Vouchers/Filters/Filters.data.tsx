import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';

const statusOptions = ['Active', 'Deactivated', 'Expired'];
export const filtersFormFieldsDefaultValues = {
  date: new Date(),
  status: '',
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
