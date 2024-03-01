import { RHFSwitchableDatepicker } from '@/components/ReactHookForm';

export const filterFormFields = [
  {
    id: 'createdAt',
    componentProps: {
      name: 'createdAt',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    id: 'endDate',
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];
