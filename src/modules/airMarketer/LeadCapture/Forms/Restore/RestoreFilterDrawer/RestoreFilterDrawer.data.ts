import { RHFSwitchableDatepicker } from '@/components/ReactHookForm';

export const filterFormFields = [
  {
    id: 'filterByDate',
    componentProps: {
      name: 'filterByDate',
      label: 'Filter By Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];
